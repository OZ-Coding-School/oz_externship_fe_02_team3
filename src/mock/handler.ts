// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import notificationsData from './notificationsData'
import type {
  NotificationItem,
  NotificationResponse,
} from '@src/types/notification'
import type { Chat } from '@src/types/chat'
import chatMessagesData, { chatList } from './chatListData'

// 변경 가능한 데이터 선언
let mutableNotificationsData: NotificationItem[] = [...notificationsData]
const mutableChatListData: Chat[] = [...chatList]

// JWT 토큰 검증 헬퍼 함수
const validateAuth = (request: Request) => {
  const authHeader = request.headers.get('Authorization')
  console.log(authHeader) // Bearer null

  if (!authHeader) {
    return { isValid: false, error: 'Authorization header missing' }
  }

  if (!authHeader.startsWith('Bearer ')) {
    return { isValid: false, error: 'Invalid authorization format' }
  }

  const token = authHeader.replace('Bearer ', '')
  console.log(token) // null

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

export const handlers = [
  // 전체 알림 목록 조회 API 모킹
  http.get('/api/v1/notifications', ({ request }) => {
    const auth = validateAuth(request)
    if (!auth.isValid) {
      return HttpResponse.json(
        { detail: 'Not authenticated.' },
        { status: 401 }
      )
    }

    const url = new URL(request.url)
    const status = url.searchParams.get('status') || 'all'
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    let filteredNotifications = mutableNotificationsData

    if (status === 'read') {
      filteredNotifications = mutableNotificationsData.filter(
        (item) => item.is_read
      )
    } else if (status === 'unread') {
      filteredNotifications = mutableNotificationsData.filter(
        (item) => !item.is_read
      )
    }

    const start = offset
    const end = offset + limit
    const paginatedResults = filteredNotifications.slice(start, end)

    const simulatedTotalCount = {
      all: 123,
      unread: 45,
      read: 78,
    }

    const response: NotificationResponse = {
      count:
        simulatedTotalCount[status as 'all' | 'unread' | 'read'] ||
        simulatedTotalCount.all,
      next:
        end < filteredNotifications.length
          ? `?offset=${end}&limit=${limit}`
          : null,
      previous:
        offset > 0
          ? `?offset=${Math.max(0, offset - limit)}&limit=${limit}`
          : null,
      results: paginatedResults,
    }

    return HttpResponse.json(response)
  }),

  // 모든 알림 읽음 처리 API (API 명세서 기반)
  http.post('/api/v1/notifications/read-all', ({ request }) => {
    const auth = validateAuth(request)
    if (!auth.isValid) {
      return HttpResponse.json(
        { detail: 'Not authenticated.' },
        { status: 401 }
      )
    }

    // 모든 알림을 읽음 상태로 변경
    mutableNotificationsData = mutableNotificationsData.map((notification) => ({
      ...notification,
      is_read: true,
    }))

    return new HttpResponse(null, { status: 204 })
  }),

  // 특정 알림 읽음 처리 API (API 명세서 기반)
  http.post('/api/v1/notifications/:id/read', ({ request, params }) => {
    const auth = validateAuth(request)
    if (!auth.isValid) {
      return HttpResponse.json(
        { detail: 'Not authenticated.' },
        { status: 401 }
      )
    }
    const notificationId = Number(params.id)

    // 유효하지 않은 ID
    if (isNaN(notificationId) || notificationId <= 0) {
      return HttpResponse.json(
        { detail: 'The request body is invalid.' },
        { status: 400 }
      )
    }

    const targetIndex = mutableNotificationsData.findIndex(
      (item) => item.notification_id === notificationId
    )

    // 알림을 찾을 수 없음
    if (targetIndex === -1) {
      return HttpResponse.json(
        { detail: 'Notification not found.' },
        { status: 404 }
      )
    }

    mutableNotificationsData[targetIndex] = {
      ...mutableNotificationsData[targetIndex],
      is_read: true,
    }

    return HttpResponse.json(mutableNotificationsData[targetIndex])
  }),

  // 읽지 않은 개수 조회 API
  http.get('/api/v1/notifications/unread-count', ({ request }) => {
    const auth = validateAuth(request)
    if (!auth.isValid) {
      return HttpResponse.json(
        { detail: 'Not authenticated.' },
        { status: 401 }
      )
    }

    const unreadCount = mutableNotificationsData.filter(
      (item) => !item.is_read
    ).length

    return HttpResponse.json({ unread_count: unreadCount })
  }),

  // 스터디 그룹 채팅 목록 조회 API
  http.get('/api/v1/chat/rooms/', ({ request }) => {
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
