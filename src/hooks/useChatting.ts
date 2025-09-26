// src/hooks/useChatting.ts
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { Chat, MessagesResponse } from '@src/types/chat'
// const API_BASE_URL = 'https://api.ozcoding.site'
// const API_BASE_URL = 'http://localhost:5173'

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,
// })
const getAuthToken = () => {
  const token = localStorage.getItem('access_token')

  if (!import.meta.env.DEV) {
    return token // 프로덕션에서는 localStorage 토큰만 반환
  }

  // 개발 환경에서는 기본 토큰 제공
  return token || 'dev-token'
}

// 채팅 목록 조회
export function useChatting() {
  // useQuery 은 데이터 조회 (GET)
  const query = useQuery<Chat[]>({
    queryKey: ['chat'],
    queryFn: async () => {
      const token = getAuthToken()
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

// 특정 채팅 메세지 조회
export function useChatMessages(id: string | undefined) {
  // useQuery 은 데이터 조회 (GET)
  const query = useQuery<MessagesResponse>({
    queryKey: ['chatMessages', id],
    queryFn: async () => {
      const token = getAuthToken()
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
