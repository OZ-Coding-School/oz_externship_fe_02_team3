// src/mock/chatHandlers.ts
import { http, HttpResponse, passthrough } from 'msw'
import type { Chat } from '@src/types/chat'
import chatMessagesData, { chatList } from '../chatListData'
const API_STATUS = {
  chatRoomsGet: true,
  unReadCountGet: true,
}
const mutableChatListData: Chat[] = [...chatList]
// JWT 토큰 검증 헬퍼 함수
const validateAuth = (request: Request) => {
  const authHeader = request.headers.get('Authorization')

  if (!authHeader) {
    return { isValid: false, error: 'Authorization header missing' }
  }

  if (!authHeader.startsWith('Bearer ')) {
    return { isValid: false, error: 'Invalid authorization format' }
  }

  const token = authHeader.replace('Bearer ', '')

  // 개발 환경에서는 단순 토큰 검증 (실제로는 JWT 검증 로직 필요)
  // if (!token || token === 'invalid') {
  //   // (문자열 "null"은 truthy 값!)
  //   return { isValid: false, error: 'Invalid or expired token' }
  // }
  if (
    !token ||
    token === 'invalid' ||
    token === 'null' ||
    token === 'undefined'
  ) {
    return { isValid: false, error: 'Invalid or expired token' }
  }

  // 개발 환경에서는 기본 토큰 제공
  return { isValid: true }
}

export const chatHandlers = [
  // 스터디 그룹 채팅 목록 조회 API
  http.get('/api/v1/chat/rooms/', ({ request }) => {
    if (API_STATUS.chatRoomsGet) {
      return passthrough()
    }
    const auth = validateAuth(request)
    if (!auth.isValid) {
      return HttpResponse.json(
        { detail: 'Not authenticated.' },
        { status: 401 }
      )
    }

    const response: Chat[] = [...mutableChatListData]
    return HttpResponse.json(response)
  }),

  // 특정 채팅방 메시지 내역 조회 API
  http.get('/api/v1/chat/rooms/:id/messages', ({ request, params }) => {
    const auth = validateAuth(request)
    if (!auth.isValid) {
      return HttpResponse.json(
        { detail: 'Not authenticated.' },
        { status: 401 }
      )
    }
    const chatRoomId = params.id as string
    // 유효하지 않은 ID
    if (!chatRoomId) {
      return HttpResponse.json(
        { detail: 'Chat room ID is required.' },
        { status: 400 }
      )
    }
    const chatMessages = chatMessagesData[chatRoomId]

    // 존재하지 않는 채팅방인 경우
    if (!chatMessages) {
      return HttpResponse.json(
        { detail: 'Chat room not found.' },
        { status: 404 }
      )
    }

    const responseData = { ...chatMessages }
    return HttpResponse.json(responseData)
  }),
]
