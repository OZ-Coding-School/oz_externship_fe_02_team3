import Icon from '@src/components/commons/Icon'
import PageLink from '@src/components/commons/page-link/PageLink'
import { Z_INDEX } from '@constants/ui'
import notificationsData from '@mock/notificationsData'
import { ROUTES } from '@src/constants/routes'
import type { NotificationItem } from '@src/types/notification'
import { cn } from '@utils/cn'
import {
  Bell as BellIcon,
  CalendarCheck as CalendarCheckIcon,
  Check as CheckIcon,
  UserRound as UserRoundIcon,
  UserRoundPlus as UserRoundPlusIcon,
  UsersRound as UsersRoundIcon,
  X as CloseIcon,
  LogOut as LogOutIcon,
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
        size="sm"
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

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // 개발단계에선 해당 값을 true 와 false 로 합니다.
  const user = true

  const notificationRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  const handleAvatarToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
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
                    </div>
                  ))}
                </div>
                <div className="flex h-[45px] bg-gray-50" />
              </div>
            )}
          </button>
          <div
            className="relative flex items-center gap-2"
            onClick={handleAvatarToggle}
          >
            <div className="bg-primary-100 flex h-8 w-8 items-center justify-center rounded-full">
              <Icon
                icon={UserRoundIcon}
                size="sm"
                className={`stroke-primary-600`}
              />
            </div>
            <p className="text-base text-gray-700">김스터디</p>
            {isUserMenuOpen && (
              <div
                className={cn(
                  'absolute top-12 right-0 flex w-48 flex-col divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white py-2 shadow-lg',
                  `z-[${Z_INDEX.DROPDOWN}]`
                )}
              >
                <PageLink
                  pageLinkInnerText="마이페이지"
                  variant="ghost"
                  link="/profile"
                  className="text-sm text-gray-700"
                  fontWeight="normal"
                  icon={UserRoundIcon}
                />
                <PageLink
                  pageLinkInnerText="로그아웃"
                  variant="ghost"
                  link="/logout"
                  iconClassName="rotate-180 stroke-"
                  className="text-sm text-gray-700"
                  fontWeight="normal"
                  icon={LogOutIcon}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <PageLink
            pageLinkInnerText="로그인"
            variant="ghost"
            fontWeight="normal"
            link="/login"
          />
          <PageLink
            pageLinkInnerText="회원가입"
            variant="filled"
            size="base"
            fontWeight="medium"
            link="/signup"
          />
        </>
      )}
    </div>
  )
}
