import { useRef, useState } from 'react'
import { useOutsideClick } from '@src/hooks/useOutsideClick'
import Icon from '@components/Icon'
import chatData from '@mock/chatData'
import { Bell as BellIcon } from 'lucide-react'
import NotificationsDropdown from './NotificationsDropdown'

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
  const notificationButtonRef = useRef<HTMLButtonElement>(null)
  const initialUnreadCount = chatData.reduce((total, chat) => {
    return total + (chat.unreadCount || 0)
  }, 0)
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount)
  const notifPanelRef = useRef<HTMLDivElement>(null)

  const handleNotificationToggle = () => {
    // 마이페이지 ui가 열려있다면 마이페이지 ui 닫기
    if (isUserMenuOpen) {
      setIsUserMenuOpen(false)
    }
    // 알림드롭다운 토글
    setIsNotificationOpen(!isNotificationOpen)
  }

  useOutsideClick(
    isNotificationOpen,
    [notificationButtonRef, notifPanelRef],
    () => setIsNotificationOpen(false)
  )

  return (
    <button
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
      {isNotificationOpen && (
        <NotificationsDropdown
          notifPanelRef={notifPanelRef}
          setIsNotificationOpen={setIsNotificationOpen}
          onUnreadCountChange={setUnreadCount}
        />
      )}
    </button>
  )
}
