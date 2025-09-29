// src/hooks/useNotifications.ts
import type { NotificationResponse } from '@src/types/notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@api/api'
import { useAuth } from '@store/auth'

// 알림 목록 조회
export function useNotifications() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn())
  const query = useQuery<NotificationResponse>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await api.get('/api/v1/notifications')

      return response.data
    },
    enabled: isLoggedIn,
    refetchOnWindowFocus: true, // 창 포커스 시에만 확인
    refetchOnReconnect: true, // 네트워크 재연결 시에만 확인
    staleTime: 60000, // 1분간은 캐시된 데이터 사용
  })
  return {
    ...query,
    notifications: query.data?.results || [],
    totalCount: query.data?.count || 0,
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
    refetchInterval: 60000, // 1분마다 자동 새로고침
    refetchOnWindowFocus: true, // 창 포커스 시 즉시 확인
    refetchOnReconnect: true, // 네트워크 재연결 시 확인
    refetchIntervalInBackground: false, // 백그라운드에서는 폴링 중단
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
