// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import notificationsData from './notificationsData'
import type { NotificationResponse } from '@src/types/notification'

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
]
