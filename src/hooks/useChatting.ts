// src/hooks/useNotifications.ts
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { Chat, MessagesResponse } from '@src/types/chat'

// 채팅 목록 조회
export function useChatting() {
  // useQuery 은 데이터 조회 (GET)
  const query = useQuery<Chat[]>({
    queryKey: ['chat'],
    queryFn: async () => {
      const token = localStorage.getItem('access_token')
      const response = await axios.get('/api/v1/chat/rooms/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    },
  })
  return {
    ...query,
    chatList: query.data || [],
  }
}

// 채팅 목록 조회
export function useChatMessages(id: string | undefined) {
  // useQuery 은 데이터 조회 (GET)
  const query = useQuery<MessagesResponse>({
    queryKey: ['chatMessages', id],
    queryFn: async () => {
      const token = localStorage.getItem('access_token')
      const response = await axios.get(`/api/v1/chat/rooms/${id}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    },
    enabled: !!id, // id가 있을 때만 쿼리 실행
  })
  return {
    ...query,
    chatMessages: query.data?.results || [],
  }
}
