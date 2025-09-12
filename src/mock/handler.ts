// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import notificationsData from './notificationsData'
import type { NotificationResponse } from '@src/types/notification'

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
  if (!token || token === 'invalid') {
    return { isValid: false, error: 'Invalid or expired token' }
  }

  return { isValid: true }
}

export const handlers = [
  // 알림 조회 API 모킹
  http.get('/api/v1/notifications', ({ request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get('status') || 'all'
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    let filteredNotifications = notificationsData

    // status 필터링
    if (status === 'read') {
      filteredNotifications = notificationsData.filter((item) => item.is_read)
    } else if (status === 'unread') {
      filteredNotifications = notificationsData.filter((item) => !item.is_read)
    }

    // 페이지네이션 적용
    const start = offset
    const end = offset + limit
    const paginatedResults = filteredNotifications.slice(start, end)

    const response: NotificationResponse = {
      count: filteredNotifications.length,
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

    // API 명세서에 따라 204 No Content 응답 (응답 본문 없음)
    return new HttpResponse(null, { status: 204 })
  }),
]
