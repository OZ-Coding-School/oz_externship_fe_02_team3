import { NOTIFICATION_TYPE } from '@constants/ui'

export type NotificationType =
  (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE]

export interface NotificationItem {
  id: number
  type: NotificationType
  title: string
  message: string
  date: string
  isRead: boolean
  isUnread: boolean
}
