// src/hooks/useNotifications.ts
import { useState, useCallback } from 'react'
import axios from 'axios'
import type {
  NotificationItem,
  NotificationResponse,
} from '@src/types/notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useNotificationsQuery() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadNotifications = useCallback(
    async (params = {}): Promise<NotificationResponse> => {
      try {
        setLoading(true)
        setError(null)

        // 스켈레톤 테스트위한 함수
        // await new Promise((res) => setTimeout(res, 2000))

        // localStorage에서 JWT 토큰 가져오기
        const token = localStorage.getItem('access_token')

        // if (!token) {
        //   throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.')
        // }
        // 단순하게 API 호출만 (MSW가 인터셉트해서 mock 데이터 반환)
        const response = await axios.get('/api/v1/notifications', {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        })

        setNotifications(response.data.results || [])
        return response.data
      } catch (err) {
        const error = err as Error
        setError(error.message || '알림을 불러오는데 실패했습니다.')
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const markAllAsRead = useCallback(async () => {
    try {
      setLoading(true)

      // 모두 읽음 실패 테스트
      // await new Promise((r) => setTimeout(r, 800))
      // throw new Error('테스트 실패')

      // localStorage에서 JWT 토큰 가져오기
      const token = localStorage.getItem('access_token')

      // if (!token) {
      //   throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.')
      // }

      // 단순하게 API 호출만 (MSW가 인터셉트해서 mock 데이터 반환)
      await axios.post(
        '/api/v1/notifications/read-all',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        }
      )

      // 읽지 않은 알림만 읽음 처리 (명세서: "읽지 않은 모든 알림을 읽음 처리")
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          is_read: true, // 모든 알림을 읽음 상태로 변경
        }))
      )
      // 204 응답에는 본문이 없으므로 빈 객체 반환
      return { success: true }
    } finally {
      setLoading(false)
    }
  }, [])

  const readNotification = useCallback(async (id: number) => {
    try {
      setLoading(true)

      // localStorage에서 JWT 토큰 가져오기
      const token = localStorage.getItem('access_token')

      // if (!token) {
      //   throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.')
      // }

      // 단순하게 API 호출만 (MSW가 인터셉트해서 mock 데이터 반환)
      const response = await axios.post(
        `/api/v1/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        }
      )
      console.log(response.data)
      const updatedNotification = response.data

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.notification_id === id
            ? { ...notification, is_read: true }
            : notification
        )
      )
      return updatedNotification
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    notifications: notifications || [],
    loading,
    error,
    loadNotifications,
    readNotification,
    markAllAsRead,
  }
}

// 알림 목록 조회
export function useNotifications() {
  const query = useQuery<NotificationResponse>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const token = localStorage.getItem('access_token')
      const response = await axios.get('/api/v1/notifications', {
        params: { status: 'all', limit: 50, offset: 0 },
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    },
  })
  return {
    ...query,
    notifications: query.data?.results || [],
    totalCount: query.data?.count || 0,
  }
}

// 읽지않은 알림 개수 조회
export function useUnreadCountQuery() {
  const query = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: async () => {
      const token = localStorage.getItem('access_token')
      const response = await axios.get('/api/v1/notifications/unread-count', {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    },
  })

  return {
    ...query,
    unreadCount: query.data?.unread_count || 0,
  }
}

// 모든 알림 읽음
export function useMarkAllAsRead() {
  //   queryClient = 캐시 창고의 관리자
  // 이 관리자를 통해 캐시된 데이터를 삭제하거나 업데이트할 수 있음
  const queryClient = useQueryClient()

  // useMutation은 변경(POST/PUT/DELETE)
  return useMutation({
    // mutationFn: 실제로 서버에 요청을 보내는 함수
    mutationFn: async () => {
      const token = localStorage.getItem('access_token')
      const response = await axios.post(
        '/api/v1/notifications/read-all',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return response.data
    },
    // 에러 없이 response를 받으면 실행
    onSuccess: () => {
      // "notifications 캐시를 무효화해!"
      // 자동으로 mutationFn 다시 실행되어 업데이트 됨
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

// 특정 알림 읽음
export function useReadNotification() {
  //   queryClient = 캐시 창고의 관리자
  // 이 관리자를 통해 캐시된 데이터를 삭제하거나 업데이트할 수 있음
  const queryClient = useQueryClient()

  // useMutation은 변경(POST/PUT/DELETE)
  return useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem('access_token')
      const response = await axios.post(
        `/api/v1/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return response.data
    },
    // 에러 없이 response를 받으면 실행
    onSuccess: () => {
      // "notifications 캐시를 무효화해!"
      // 자동으로 mutationFn 다시 실행되어 업데이트 됨
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      console.log('모든 알림 읽음 처리 완료')
    },
    onError: (error) => {
      console.error('모두 읽음 처리 실패:', error)
      // 선택적: 전역 토스트 메시지
    },
  })
}
