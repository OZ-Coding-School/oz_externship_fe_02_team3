import Button from '@src/components/button/Button'
import Icon from '@components/Icon'
import PageLink from '@components/PageLink'
import { Z_INDEX } from '@constants/ui'
import notificationsData from '@mock/notificationsData'
import { ROUTES } from '@src/constants/routes'
import type { NotificationItem } from '@src/types/notification'
import {
  Bell as BellIcon,
  CalendarCheck as CalendarCheckIcon,
  Check as CheckIcon,
  UserRound as UserRoundIcon,
  UserRoundPlus as UserRoundPlusIcon,
  UsersRound as UsersRoundIcon,
  X as CloseIcon,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  notificationIconClass,
  notificationIconStrokeClass,
  tabClass,
} from './notificationIconClass'

const iconMap = {
  application: UserRoundPlusIcon,
  approval: CheckIcon,
  rejection: CloseIcon,
  join: UsersRoundIcon,
  study_end: CalendarCheckIcon,
  reminder: BellIcon,
}

const getNotificationIcon = (type: NotificationItem['type']) => {
  const IconComponent = iconMap[type] || BellIcon

  return (
    <div className={notificationIconClass({ type })}>
      <Icon
        icon={IconComponent}
        className={notificationIconStrokeClass({ type })}
        size="s"
      />
    </div>
  )
}

export default function HeaderUserSection() {
  const navigate = useNavigate()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(notificationsData)
  const [notificationFilter, setNotificationFilter] = useState<
    'all' | 'unread' | 'read'
  >('all')
  // 개발단계에선 해당 값을 true 와 false 로 합니다.
  const user = true

  const notificationRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
        isUnread: false,
      }))
    )
  }

  const linkToRecruitmentManage = () => {
    navigate(ROUTES.RECRUITMENT_MANAGE)
    setIsNotificationOpen(false)
  }
  const filteredNotifications = useMemo(() => {
    switch (notificationFilter) {
      case 'unread':
        return notifications.filter((notification) => notification.isUnread)
      case 'read':
        return notifications.filter((notification) => notification.isRead)
      default:
        return notifications
    }
  }, [notifications, notificationFilter])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isNotificationOpen &&
        notificationRef.current &&
        buttonRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isNotificationOpen])
  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <button
            ref={buttonRef}
            className="relative flex size-10 items-center justify-center rounded-full"
            onClick={handleNotificationToggle}
          >
            <Icon icon={BellIcon} size="md" className={`stroke-gray-600`} />
            <p className="bg-danger-500 absolute -top-1 left-6 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-white">
              3
            </p>
            {isNotificationOpen && (
              <div
                ref={notificationRef}
                className={`absolute top-12 right-0 z-[${Z_INDEX.DROPDOWN}] max-h-[819.2px] w-96 overflow-hidden rounded-lg border border-gray-200 bg-white`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-4 pt-4 pb-[17px]">
                  <h3 className="flex items-center justify-start text-lg font-semibold text-gray-900">
                    알림
                  </h3>
                  <div
                    onClick={handleMarkAllAsRead}
                    className="text-primary-600 flex items-center justify-center text-center text-sm"
                  >
                    모두 읽음
                  </div>
                </div>

                <div className="flex">
                  <div
                    role="tab"
                    onClick={() => setNotificationFilter('all')}
                    className={tabClass({
                      active: notificationFilter === 'all',
                    })}
                  >
                    전체보기 ({notifications.length})
                  </div>
                  <div
                    role="tab"
                    onClick={() => setNotificationFilter('unread')}
                    className={tabClass({
                      active: notificationFilter === 'unread',
                    })}
                  >
                    읽지 않음 (
                    {
                      notifications.filter(
                        (notification) => notification.isUnread
                      ).length
                    }
                    )
                  </div>
                  <div
                    role="tab"
                    onClick={() => setNotificationFilter('read')}
                    className={tabClass({
                      active: notificationFilter === 'read',
                    })}
                  >
                    읽음 (
                    {
                      notifications.filter(
                        (notification) => notification.isRead
                      ).length
                    }
                    )
                  </div>
                </div>

                <div
                  className="flex max-h-80 flex-col overflow-y-auto"
                  role="tabpanel"
                >
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`${notification.isUnread ? 'bg-primary-50' : 'bg-white'} flex flex-col content-stretch items-start justify-start border-gray-100`}
                    >
                      <div
                        className="flex items-start gap-3 border-b border-gray-200 px-4 pt-[17px] pb-4"
                        onClick={linkToRecruitmentManage}
                      >
                        {getNotificationIcon(notification.type)}
                        <div className="flex flex-col gap-1">
                          <p className="line-clamp-2 text-left text-sm text-gray-900">
                            {notification.message}
                          </p>
                          {/* </div> */}
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
                    </div>
                  ))}
                </div>
                <div className="flex h-[45px] bg-gray-50" />
              </div>
            )}
          </button>
          <a className="flex items-center gap-2">
            <div className="bg-primary-100 flex h-8 w-8 items-center justify-center rounded-full">
              <Icon
                icon={UserRoundIcon}
                size="sm"
                className={`stroke-primary-600`}
              />
            </div>
            <p className="text-base text-gray-700">김스터디</p>
          </a>
        </>
      ) : (
        <>
          <PageLink
            pageLinkInnerText="로그인"
            variant="ghost"
            hoverTextColor="text-gray-700"
            fontWeight="normal"
            linkTo="/login"
          />
          <Button
            buttonInnerText="회원가입"
            size="base"
            variant="primary"
            fontWeight="medium"
          />
        </>
      )}
    </div>
  )
}
