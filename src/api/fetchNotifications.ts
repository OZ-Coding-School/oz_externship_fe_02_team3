// src/api/notificationFetcher.ts
import axios from 'axios'
import type { NotificationResponse } from '@src/types/notification'

export async function fetchNotifications({
  status = 'all',
  limit = 10,
  offset = 0,
} = {}): Promise<NotificationResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const token = localStorage.getItem('access_token')

  const response = await axios.get('/api/v1/notifications', {
    params: { status, limit, offset },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    timeout: 5000,
  })

  return response.data
}
