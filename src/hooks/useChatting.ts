// src/hooks/useChatting.ts
import { useQuery } from '@tanstack/react-query'
import type { Chat, MessagesResponse } from '@src/types/chat'
import { api } from '@api/api' // 수정: 팀원의 api import

// 채팅 목록 조회
export function useChatting() {
  // useQuery 은 데이터 조회 (GET)
  const query = useQuery<Chat[]>({
    queryKey: ['chat'],
    queryFn: async () => {
      const response = await api.get('/api/v1/chat/rooms')
      return response.data
    },
  })
  return {
    ...query,
    chatList: query.data || [],
  }
}

// 특정 채팅 메세지 조회
export function useChatMessages(id: string | undefined) {
  // useQuery 은 데이터 조회 (GET)
  const query = useQuery<MessagesResponse>({
    queryKey: ['chatMessages', id],
    queryFn: async () => {
      try {
        const response = await api.get(`/api/v1/chat/rooms/${id}/messages`)
        return response.data
      } catch (error: any) {
        if (error.response?.status === 404) {
          return { next_cursor: null, results: [] }
        }
        throw error
      }
    },
    enabled: !!id,
    retry: false,
  })
  return {
    ...query,
    chatMessages: query.data?.results || [],
  }
}
