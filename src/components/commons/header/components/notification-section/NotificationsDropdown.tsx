import { useEffect, useMemo, useState, type RefObject } from 'react'
import { fetchNotifications } from '@api/fetchNotifications'
import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import NotificationTabs from './NotificationTabs'
import type { NotificationItem as NotificationItemType } from '@src/types/notification'
import NotificationItem from './NotificationItem'
import { useNotifications } from '@src/hooks/useNotifications'

interface NotificationsDropdownProps {
  setIsNotificationOpen: (isNotificationOpen: boolean) => void
  /** 부모에서 useOutsideClick에 연결된 패널 ref를 그대로 전달 */
  notificationsDropdownRef: RefObject<HTMLDivElement | null>
  onUnreadCountChange: (count: number) => void
}

export default function NotificationsDropdown({
  setIsNotificationOpen,
  notificationsDropdownRef,
  onUnreadCountChange,
}: NotificationsDropdownProps) {
  // const [notifications, setNotifications] = useState<NotificationItemType[]>([])
  // const [notifications, setNotifications] = useState<NotificationItemType[]>([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  // const [notificationFilter, setNotificationFilter] = useState<
  //   'all' | 'unread' | 'read'
  // >('all')

  const { notifications, loading, error, loadNotifications, markAllAsRead } =
    useNotifications()
  const [notificationFilter, setNotificationFilter] = useState<
    'all' | 'unread' | 'read'
  >('all')

  // const handleMarkAllAsRead = () => {
  //   setNotifications((prev) =>
  //     prev.map((notification) => ({
  //       ...notification,
  //       isRead: true,
  //       isUnread: false,
  //     }))
  //   )
  //   // 현재 '읽지않음' 탭이 선택되어 있다면 '전체보기'로 전환
  //   setNotificationFilter('all')
  // }

  // const handleMarkAllAsRead = () => {  // async 제거
  //   setNotifications((prev) =>
  //     prev.map((notification) => ({
  //       ...notification,
  //       is_read: true,
  //     }))
  //   )
  //   setNotificationFilter('all')
  // }
  const handleMarkAllAsRead = () => {
    markAllAsRead()
    setNotificationFilter('all')
  }
  const filteredNotifications = useMemo(() => {
    switch (notificationFilter) {
      case 'unread':
        return notifications.filter((notification) => !notification.is_read)
      case 'read':
        return notifications.filter((notification) => notification.is_read)
      default:
        return notifications
    }
  }, [notifications, notificationFilter])

  // 읽지 않은 알림 개수를 부모에게 전달
  useEffect(() => {
    const unreadCount = notifications.filter((noti) => !noti.is_read).length
    onUnreadCountChange(unreadCount)
  }, [notifications, onUnreadCountChange])

  useEffect(() => {
    loadNotifications({
      status: notificationFilter === 'all' ? 'all' : notificationFilter,
      limit: 50,
      offset: 0,
    })
  }, [notificationFilter, loadNotifications])

  return (
    <div
      ref={notificationsDropdownRef}
      className={cn(
        'absolute top-12 right-0 max-h-[819.2px] overflow-hidden rounded-lg border border-gray-200 bg-white',
        `z-[${Z_INDEX.DROPDOWN}]`
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-[17px]">
        <h3 className="flex items-center justify-start text-lg font-semibold text-gray-900">
          알림
        </h3>
        <button
          type="button"
          onClick={handleMarkAllAsRead}
          className="text-primary-600 flex items-center justify-center text-center text-sm"
        >
          모두 읽음
        </button>
      </div>

      <NotificationTabs
        setNotificationFilter={setNotificationFilter}
        notificationFilter={notificationFilter}
        notifications={notifications}
      />

      <div
        className="scrollbar-hide flex max-h-80 flex-col overflow-y-auto"
        role="tabpanel"
      >
        {loading ? (
          <div className="flex h-32 items-center justify-center text-sm text-gray-500">
            로딩 중...
          </div>
        ) : error ? (
          <div className="flex h-32 items-center justify-center text-sm text-red-500">
            {error}
          </div>
        ) : filteredNotifications.length !== 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.notification_id} // 변경됨: id → notification_id
              {...notification}
              setIsNotificationOpen={setIsNotificationOpen}
            />
          ))
        ) : (
          <div className="flex h-32 items-center justify-center text-sm text-gray-500">
            표시할 알림이 없습니다.
          </div>
        )}
      </div>
      <div className="flex h-[45px] bg-gray-50" />
    </div>
  )
}
