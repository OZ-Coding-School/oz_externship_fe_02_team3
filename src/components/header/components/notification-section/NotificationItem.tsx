import { cn } from '@utils/cn'
import Icon from '@components/Icon'
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
  application: UserRoundPlusIcon,
  approval: CheckIcon,
  rejection: CloseIcon,
  join: UsersRoundIcon,
  study_end: CalendarCheckIcon,
  reminder: BellIcon,
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

interface NotificationItemProps extends NotificationItemType {
  setIsNotificationOpen: (isOpen: boolean) => void
}

export default function NotificationItem({
  setIsNotificationOpen,
  ...notification
}: NotificationItemProps) {
  const navigate = useNavigate()
  const linkToRecruitmentManage = () => {
    navigate(ROUTES.RECRUITMENT_MANAGE)
    setIsNotificationOpen(false)
  }
  return (
    <div
      className={cn(
        'flex cursor-pointer items-start gap-3 border-b border-gray-200 px-4 pt-[17px] pb-4 transition-colors hover:bg-gray-50',
        notification.isUnread ? 'bg-primary-50' : 'bg-white'
      )}
      onClick={linkToRecruitmentManage}
    >
      {getNotificationIcon(notification.type)}
      <div className="flex flex-col gap-1">
        <p className="line-clamp-2 min-w-72 text-left text-sm text-gray-900">
          {notification.message}
        </p>
        <p className="flex items-center text-xs text-gray-500">
          {notification.date}
        </p>
      </div>
      {notification.isUnread && (
        <div className="flex pt-2">
          <div className="bg-primary-500 size-2 rounded-full" />
        </div>
      )}
    </div>
  )
}
