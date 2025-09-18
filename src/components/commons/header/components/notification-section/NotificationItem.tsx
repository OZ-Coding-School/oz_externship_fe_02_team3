import { cn } from '@utils/cn'
import Icon from '@components/commons/Icon'
import {
  notificationIconClass,
  notificationIconStrokeClass,
} from './notificationIconClass'
import { useNavigate } from 'react-router-dom'
import {
  Bell as BellIcon,
  CalendarCheck as CalendarCheckIcon,
  Check as CheckIcon,
  NotebookPen as CreatingRecordIcon,
  UserRoundPlus as UserRoundPlusIcon,
  UsersRound as UsersRoundIcon,
  CalendarRange as CalendarRangeIcon,
  CalendarClock as CalendarClockIcon,
  X as CloseIcon,
} from 'lucide-react'

const iconMap = {
  ADD_APPLICATION: UserRoundPlusIcon,
  APPLICATION_ACCEPT: CheckIcon,
  APPLICATION_REJECT: CloseIcon,
  STUDY_JOIN: UsersRoundIcon,
  STUDY_NOTE_CREATE: CreatingRecordIcon,
  STUDY_REVIEW_REQUEST: CalendarCheckIcon,
  TODAY_SCHEDULE: CalendarClockIcon,
  UPCOMING_SCHEDULE: CalendarRangeIcon,
}

import type { NotificationItem as NotificationItemType } from '@src/types/notification'
import { useReadNotification } from '@src/hooks/useNotifications'

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
  const serverDate = new Date(dateString)
  const now = new Date()

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )
  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)

  const diffMs = now.getTime() - serverDate.getTime() // 밀리초 차이
  const hours = Math.floor(diffMs / (60 * 60 * 1000))
  const minutes = Math.floor(diffMs / 60000)

  if (serverDate >= startOfYesterday && serverDate < startOfToday) {
    return '어제'
  } else if (minutes < 1) {
    return '방금 전'
  } else if (minutes < 60) {
    return `${minutes}분 전`
  } else if (hours < 24) {
    return `${hours}시간 전`
  } else {
    return serverDate.toLocaleDateString('ko-KR', {
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
  const { notification_id } = notification
  const navigate = useNavigate()
  const readNotificationMutation = useReadNotification()

  const handleNotificationClick = () => {
    console.log(notification.back_url_link)

    if (notification.is_read || readNotificationMutation.isPending) {
      setIsNotificationOpen(false)
      if (notification.back_url_link) navigate(notification.back_url_link)
      return
    }

    readNotificationMutation.mutate(notification_id, {
      onError: (error) => {
        console.error('읽음 처리 실패:', error)
      },
      onSuccess: () => {
        console.log('읽음 처리 성공!')
        setIsNotificationOpen(false)
        if (notification.back_url_link) {
          navigate(notification.back_url_link)
        }
      },
    })

    // setIsNotificationOpen(false)
  }
  return (
    <div
      className={cn(
        'flex cursor-pointer items-start gap-3 border-b border-gray-200 px-4 pt-[17px] pb-4 transition-colors hover:bg-gray-50',
        !notification.is_read ? 'bg-primary-50' : 'bg-white'
      )}
      onClick={() => handleNotificationClick()}
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
