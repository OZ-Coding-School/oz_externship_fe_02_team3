import { NOTIFICATION_TYPE } from '@constants/ui'

export type NotificationType =
  (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE]

export interface NotificationItem {
  notification_id: number
  content: string
  type: NotificationType
  is_read: boolean
  created_at: string
  back_url_link: string
}

export interface NotificationResponse {
  count: number
  next: string | null
  previous: string | null
  results: NotificationItem[]
}
