// src/hooks/useNotifications.ts
import { useState, useCallback } from 'react'
import axios from 'axios'
import type {
  NotificationItem,
  NotificationResponse,
} from '@src/types/notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const getAuthToken = () => {
  const token = localStorage.getItem('access_token')

  if (!import.meta.env.DEV) {
    return token // 프로덕션에서는 localStorage 토큰만 반환
  }

  // 개발 환경에서는 기본 토큰 제공
  return token || 'dev-token'
}

// 알림 목록 조회
export function useNotifications() {
  const query = useQuery<NotificationResponse>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const token = getAuthToken()
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
  // useQuery 은 데이터 조회 (GET)
  const query = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: async () => {
      // const token = localStorage.getItem('access_token')
      const token = getAuthToken()
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
  // queryClient = 캐시 창고의 관리자
  // 이 관리자를 통해 캐시된 데이터를 삭제하거나 업데이트할 수 있음
  const queryClient = useQueryClient()

  // useMutation은 변경(POST/PUT/DELETE)
  return useMutation({
    // mutationFn: 실제로 서버에 요청을 보내는 함수
    mutationFn: async () => {
      // const token = localStorage.getItem('access_token')
      const token = getAuthToken()
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
      // const token = localStorage.getItem('access_token')

      const token = getAuthToken()
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
