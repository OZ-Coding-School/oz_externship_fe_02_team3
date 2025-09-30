// src/hooks/useNotifications.ts
import type { NotificationResponse } from '@src/types/notification'
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { api } from '@api/api'
import { useAuth } from '@store/auth'
import { useEffect } from 'react'
// SSE 실시간 연결
export function useNotificationSSE() {
  const queryClient = useQueryClient()
  const user = useAuth((state) => state.user)
  const bootstrapped = useAuth((state) => state.bootstrapped)

  useEffect(() => {
    if (!bootstrapped || !user || !user.id) {
      console.log('[SSE] 연결 안 함:', {
        bootstrapped,
        hasUser: !!user,
        userId: user?.id,
      })
      return
    }

    const userId = user.id
    console.log('[SSE] 연결 시작:', userId)
    // SSE 연결 시작
    const eventSource = new EventSource(
      `https://ozcoding.site/events/?channel=user-${userId}`,
      { withCredentials: true }
    )

    eventSource.onmessage = (event) => {
      console.log('[SSE] 메시지 수신:', event.data)
      const data = JSON.parse(event.data)

      queryClient.setQueryData(['notifications', 'unread-count'], {
        unread_count: data.unreadCount,
      })

      queryClient.invalidateQueries({
        queryKey: ['notifications'],
        refetchType: 'active',
      })
    }

    eventSource.onerror = (error) => {
      console.error('[SSE] 연결 오류:', error)
      eventSource.close()
    }

    return () => {
      console.log('[SSE] 연결 종료:', userId)
      eventSource.close()
    }
  }, [bootstrapped, user, queryClient])
}

// 알림 목록 조회
export function useNotifications() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn())
  const query = useInfiniteQuery<NotificationResponse>({
    queryKey: ['notifications'],

    // 각 페이지를 불러올 때 실행되는 함수
    // pageParam: 현재 불러올 페이지의 offset (0, 10, 20, 30...)
    queryFn: async ({ pageParam = 0 }) => {
      const response = await api.get('/api/v1/notifications', {
        params: {
          limit: 10, // 한 번에 10개씩
          offset: pageParam, // 시작 위치
          status: 'all',
        },
      })
      return response.data
    },
    enabled: isLoggedIn,
    initialPageParam: 0, // 첫 시작은 0부터
    // 다음 페이지가 있는지 판단하고, 있으면 다음 offset을 반환
    getNextPageParam: (lastPage, allPages) => {
      // 지금까지 불러온 알림 개수 세기
      let totalFetched = 0
      for (const page of allPages) {
        totalFetched += page.results.length
      }

      // 전체 개수보다 적게 불러왔으면 더 있다는 뜻
      if (totalFetched < lastPage.count) {
        return totalFetched // 다음 offset
      }
      return undefined // 더 이상 없음
    },

    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 60000,
  })

  // 여러 페이지의 알림들을 하나의 배열로 합치기
  // pages = [페이지1, 페이지2, 페이지3...]
  // 각 페이지에서 results만 꺼내서 하나로 합침
  const notifications = []
  if (query.data?.pages) {
    for (const page of query.data.pages) {
      for (const notification of page.results) {
        notifications.push(notification)
      }
    }
  }

  const totalCount = query.data?.pages[0]?.count || 0

  return {
    ...query,
    notifications, // 합쳐진 모든 알림들
    totalCount,
  }
}

// 읽지않은 알림 개수 조회
export function useUnreadCountQuery() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn())
  const query = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: async () => {
      const response = await api.get('/api/v1/notifications/unread-count')

      return response.data
    },
    enabled: isLoggedIn,
    // refetchInterval: 60000, // 1분마다 자동 새로고침
    refetchOnWindowFocus: true, // 창 포커스 시 즉시 확인
    refetchOnReconnect: true, // 네트워크 재연결 시 확인
    // refetchIntervalInBackground: false, // 백그라운드에서는 폴링 중단
  })

  return {
    ...query,
    unreadCount: query.data?.unread_count || 0,
  }
}

// 모든 알림 읽음
export function useMarkAllAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await api.post('/api/v1/notifications/read-all')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({
        queryKey: ['notifications', 'unread-count'],
      })
    },
  })
}

// 특정 알림 읽음
export function useReadNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.post(`/api/v1/notifications/${id}/read`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({
        queryKey: ['notifications', 'unread-count'],
      })
    },
    onError: (error) => {
      console.error('모두 읽음 처리 실패:', error)
    },
  })
}
