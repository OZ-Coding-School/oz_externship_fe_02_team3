import { useEffect, useMemo, useState, type RefObject } from 'react'
import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import NotificationTabs from './NotificationTabs'
import type { NotificationItem as NotificationItemType } from '@src/types/notification'
import NotificationItem from './NotificationItem'
import { useNotifications } from '@src/hooks/useNotifications'

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

  const { notifications, loading, error, loadNotifications, markAllAsRead } =
    useNotifications()

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead()
      setNotificationFilter('all')
    } catch (error) {
      // 에러는 useNotifications에서 처리되므로 여기서는 추가 처리 불필요
      console.error('모두 읽음 처리 실패:', error)
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
          <>
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex animate-pulse items-start gap-3 border-b border-gray-200 px-4 pt-[17px] pb-4"
              >
                {/* 아이콘 자리 */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200" />

                {/* 콘텐츠 자리 */}
                <div className="flex min-w-72 gap-1">
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                    <div className="mt-1 h-3 w-16 rounded bg-gray-200" />
                  </div>
                  {/* 읽지 않음 표시 자리 */}
                  <div className="flex pt-2">
                    <div className="size-2 rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </>
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
