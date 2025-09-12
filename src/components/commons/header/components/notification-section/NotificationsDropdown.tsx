import { useEffect, useMemo, useState, type RefObject } from 'react'
import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import NotificationTabs from './NotificationTabs'
import NotificationItem from './NotificationItem'
import { useNotifications } from '@src/hooks/useNotifications'
import NotificationsSkeleton from './NotificationsSkeleton'

interface NotificationsDropdownProps {
  setIsNotificationOpen: (isNotificationOpen: boolean) => void
  notificationsDropdownRef: RefObject<HTMLDivElement | null>
  onUnreadCountChange: (count: number) => void
}

export default function NotificationsDropdown({
  setIsNotificationOpen,
  notificationsDropdownRef,
  onUnreadCountChange,
}: NotificationsDropdownProps) {
  const [notificationFilter, setNotificationFilter] = useState<
    'all' | 'unread' | 'read'
  >('all')
  const [markAllError, setMarkAllError] = useState<string | null>(null)
  const { notifications, loading, error, loadNotifications, markAllAsRead } =
    useNotifications()

  const handleMarkAllAsRead = async () => {
    setMarkAllError(null)
    try {
      await markAllAsRead()
      setNotificationFilter('all')
      setMarkAllError(null)
    } catch (err) {
      const error = err as Error
      setMarkAllError(error.message || '모두 읽음 처리에 실패했어요.')
    }
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

  // 초기 로딩시에만 전체 알림을 가져옴
  useEffect(() => {
    loadNotifications({
      status: 'all', // 항상 전체 데이터 가져오기
      limit: 50,
      offset: 0,
    })
  }, [loadNotifications])

  return (
    <div
      ref={notificationsDropdownRef}
      className={cn(
        'absolute top-12 right-0 max-h-[819.2px] overflow-hidden rounded-lg border border-gray-200 bg-white',
        `${Z_INDEX.DROPDOWN}`
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-[17px]">
        <h3 className="flex items-center justify-start text-lg font-semibold text-gray-900">
          알림
        </h3>
        <button
          type="button"
          disabled={loading}
          onClick={handleMarkAllAsRead}
          className="text-primary-600 flex items-center justify-center text-center text-sm"
        >
          {loading ? '처리 중…' : '모두 읽음'}
        </button>
      </div>

      <NotificationTabs
        setNotificationFilter={setNotificationFilter}
        notificationFilter={notificationFilter}
        notifications={notifications}
      />
      {markAllError && (
        <div role="alert" className="px-4 py-2 text-sm text-red-600">
          {markAllError}
          <button
            onClick={handleMarkAllAsRead} // 재시도 연결
            className="ml-2 underline"
          >
            다시 시도
          </button>
        </div>
      )}

      <div
        className="scrollbar-hide flex max-h-80 flex-col overflow-y-auto"
        role="tabpanel"
      >
        {loading ? (
          <NotificationsSkeleton />
        ) : error ? (
          <div className="flex items-center justify-center text-sm text-red-500">
            {error}
          </div>
        ) : filteredNotifications.length !== 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.notification_id}
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
