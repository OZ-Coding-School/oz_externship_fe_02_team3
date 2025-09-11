import { cn } from '@utils/cn'
import Icon from '@components/commons/Icon'
import {
  notificationIconClass,
  notificationIconStrokeClass,
} from './notificationIconClass'
import { ROUTES } from '@src/constants/routes'
import { useNavigate } from 'react-router-dom'
import {
  Bell as BellIcon,
  CalendarCheck as CalendarCheckIcon,
  Check as CheckIcon,
  UserRoundPlus as UserRoundPlusIcon,
  UsersRound as UsersRoundIcon,
  X as CloseIcon,
} from 'lucide-react'
const iconMap = {
  ADD_APPLICATION: UserRoundPlusIcon,
  APPROVE_APPLICATION: CheckIcon,
  REJECT_APPLICATION: CloseIcon,
  NEW_MEMBER_JOIN: UsersRoundIcon,
  STUDY_END: CalendarCheckIcon,
  REMINDER: BellIcon,
}
import type { NotificationItem as NotificationItemType } from '@src/types/notification'

const getNotificationIcon = (type: NotificationItemType['type']) => {
  const IconComponent = iconMap[type] || BellIcon

  return (
    <div className={notificationIconClass({ type })}>
      <Icon
        icon={IconComponent}
        className={notificationIconStrokeClass({ type })}
        size="sm"
      />
    </div>
  )
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffInDays === 0) {
    return '오늘'
  } else if (diffInDays === 1) {
    return '어제'
  } else {
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    })
  }
}
interface NotificationItemProps extends NotificationItemType {
  setIsNotificationOpen: (isOpen: boolean) => void
}

export default function NotificationItem({
  setIsNotificationOpen,
  ...notification
}: NotificationItemProps) {
  const navigate = useNavigate()
  const handleNotificationClick = () => {
    if (notification.back_url_link) {
      navigate(notification.back_url_link)
    }
    setIsNotificationOpen(false)
  }
  return (
    <div
      className={cn(
        'flex cursor-pointer items-start gap-3 border-b border-gray-200 px-4 pt-[17px] pb-4 transition-colors hover:bg-gray-50',
        !notification.is_read ? 'bg-primary-50' : 'bg-white'
      )}
      onClick={handleNotificationClick}
    >
      {getNotificationIcon(notification.type)}
      <div className="flex min-w-72 gap-1">
        <div className="flex flex-col gap-1">
          <p className="line-clamp-2 text-left text-sm text-gray-900">
            {notification.content}
          </p>
          <p className="flex items-center text-xs text-gray-500">
            {formatDate(notification.created_at)}
          </p>
        </div>
        {!notification.is_read && (
          <div className="flex pt-2">
            <div className="bg-primary-500 size-2 rounded-full" />
          </div>
        )}
      </div>
    </div>
  )
}
