import { tabClass } from './notificationIconClass'
import type { NotificationItem } from '@src/types/notification'
import { cn } from '@utils/cn'

interface NotificationTabsProps {
  setNotificationFilter: (filter: 'all' | 'unread' | 'read') => void
  notificationFilter: 'all' | 'unread' | 'read'
  notifications: NotificationItem[]
}
export default function NotificationTabs({
  setNotificationFilter,
  notificationFilter,
  notifications,
}: NotificationTabsProps) {
  const unreadCount = notifications.filter(
    (notification) => notification.isUnread
  ).length
  const readCount = notifications.filter(
    (notification) => notification.isRead
  ).length
  const isUnreadTabDisabled = unreadCount === 0
  const handleTabClick = (filter: 'all' | 'unread' | 'read') => {
    // 읽지않음 탭이 비활성화된 경우 클릭 무시
    if (filter === 'unread' && isUnreadTabDisabled) {
      return
    }
    setNotificationFilter(filter)
  }

  return (
    <div className="flex">
      <div
        role="tab"
        onClick={() => handleTabClick('all')}
        className={tabClass({
          active: notificationFilter === 'all',
        })}
      >
        전체보기 ({notifications.length})
      </div>
      <div
        role="tab"
        onClick={() => handleTabClick('unread')}
        className={cn(
          tabClass({
            active: notificationFilter === 'unread',
          }),
          isUnreadTabDisabled && 'cursor-not-allowed text-gray-400 opacity-50'
        )}
      >
        읽지 않음 ({unreadCount})
      </div>
      <div
        role="tab"
        onClick={() => handleTabClick('read')}
        className={cn(
          tabClass({
            active: notificationFilter === 'read',
          }),
          isUnreadTabDisabled && 'cursor-not-allowed text-gray-400 opacity-50'
        )}
      >
        읽음 ({readCount})
      </div>
    </div>
  )
}
