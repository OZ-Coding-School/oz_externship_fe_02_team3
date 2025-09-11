// src/hooks/useNotifications.ts
import { useState, useCallback } from 'react'
import axios from 'axios'
import type {
  NotificationItem,
  NotificationResponse,
} from '@src/types/notification'

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadNotifications = useCallback(async (params = {}) => {
    try {
      setLoading(true)
      setError(null)

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
      console.log('알림 조회 에러:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const markAllAsRead = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

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
    } catch (err) {
      setError('알림 읽음 처리에 실패했습니다.')
      console.error('알림 조회 에러:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])
  // const markAllAsRead = useCallback(() => {
  //   setNotifications((prev) =>
  //     prev.map((notification) => ({
  //       ...notification,
  //       is_read: true,
  //     }))
  //   )
  // }, [])

  return {
    notifications: notifications || [],
    loading,
    error,
    loadNotifications,
    markAllAsRead,
  }
}
