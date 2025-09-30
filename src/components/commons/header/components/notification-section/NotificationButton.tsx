import { useRef } from 'react'
import { useOutsideClick } from '@src/hooks/useOutsideClick'
import Icon from '@components/commons/Icon'
import { Bell as BellIcon } from 'lucide-react'
import NotificationsDropdown from './NotificationsDropdown'
import {
  useUnreadCountQuery,
  useNotificationSSE,
  useNotifications,
} from '@hooks/useNotifications'

interface NotificationButtonProps {
  isNotificationOpen: boolean
  setIsNotificationOpen: (isNotificationOpen: boolean) => void
  isUserMenuOpen: boolean
  setIsUserMenuOpen: (isUserMenuOpen: boolean) => void
}

export default function NotificationButton({
  isNotificationOpen,
  setIsNotificationOpen,
  isUserMenuOpen,
  setIsUserMenuOpen,
}: NotificationButtonProps) {
  useNotificationSSE()
  const { unreadCount } = useUnreadCountQuery()
  const { refetch } = useNotifications()

  const notificationsDropdownRef = useRef<HTMLDivElement>(null)
  const notificationButtonRef = useRef<HTMLDivElement>(null)

  const handleNotificationToggle = () => {
    if (isUserMenuOpen) {
      setIsUserMenuOpen(false)
    }
    const nextState = !isNotificationOpen
    setIsNotificationOpen(nextState)

    if (nextState) {
      refetch()
    }
  }

  useOutsideClick(
    isNotificationOpen,
    [notificationButtonRef, notificationsDropdownRef],
    () => setIsNotificationOpen(false)
  )

  return (
    <div className="relative">
      <div
        ref={notificationButtonRef}
        className="relative flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
        onClick={handleNotificationToggle}
      >
        <Icon icon={BellIcon} size="md" className={`stroke-gray-600`} />
        {unreadCount > 0 && (
          <span className="bg-danger-500 absolute -top-1 left-6 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-semibold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>
      {isNotificationOpen && (
        <NotificationsDropdown
          notificationsDropdownRef={notificationsDropdownRef}
          setIsNotificationOpen={setIsNotificationOpen}
        />
      )}
    </div>
  )
}
