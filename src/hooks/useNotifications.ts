// src/hooks/useNotifications.ts
import { useState, useEffect, useCallback } from 'react'
import { fetchNotifications } from '@api/fetchNotifications'
import type { NotificationItem } from '@src/types/notification'

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadNotifications = useCallback(async (params = {}) => {
    try {
      setLoading(true)
      setError(null)

      const data = await fetchNotifications(params)

      setNotifications(data.results || [])
      console.log(data)
      return data
    } catch (err) {
      setError('알림을 불러오는데 실패했습니다.')
      console.error('알림 조회 에러:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        is_read: true,
      }))
    )
  }, [])

  return {
    notifications: notifications || [],
    loading,
    error,
    loadNotifications,
    markAllAsRead,
  }
}
