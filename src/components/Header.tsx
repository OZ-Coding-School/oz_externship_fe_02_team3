import Icon from '@components/Icon'
import {
  Bell,
  CalendarCheck,
  Check,
  UserRound,
  UserRoundPlus,
  UsersRound,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
interface Notification {
  id: number
  type:
    | 'application'
    | 'approval'
    | 'rejection'
    | 'join'
    | 'study_end'
    | 'reminder'
  title: string
  message: string
  date: string
  isRead: boolean
  isUnread: boolean
}
const notificationsData: Notification[] = [
  {
    id: 1,
    type: 'application',
    title: '지원자 대기',
    message:
      'Unity 게임 개발 프로젝트 팀원 모집 구인 공고에 대한 1건의 대기중인 지원자가 있습니다.',
    date: '12월 1일',
    isRead: false,
    isUnread: true,
  },
  {
    id: 2,
    type: 'approval',
    title: '지원 승인',
    message:
      'React 실무 프로젝트 함께하실 분 모집합니다! 구인 공고에 대한 지원내역이 승인되었습니다.',
    date: '12월 1일',
    isRead: false,
    isUnread: true,
  },
  {
    id: 3,
    type: 'join',
    title: '새 멤버 참여',
    message:
      'React 실무 프로젝트 스터디에 김민지님이 참여했습니다. 환영해주세요!',
    date: '12월 1일',
    isRead: true,
    isUnread: false,
  },
  {
    id: 4,
    type: 'rejection',
    title: '지원 거절',
    message:
      'Vue.js 프론트엔드 개발팀 모집 구인 공고에 대한 지원내역이 거절되었습니다.',
    date: '11월 30일',
    isRead: true,
    isUnread: false,
  },
  {
    id: 5,
    type: 'study_end',
    title: '스터디 종료',
    message:
      '오늘은 Python 데이터 분석 스터디의 종료일이에요! 스터디 후기를 기록해주세요!',
    date: '11월 29일',
    isRead: false,
    isUnread: true,
  },
  {
    id: 6,
    type: 'application',
    title: '지원자 대기',
    message:
      'React 실무 프로젝트 함께하실 분 모집합니다! 구인 공고에 대한 2건의 대기중인 지원자가 있습니다.',
    date: '11월 29일',
    isRead: true,
    isUnread: false,
  },
]
const Header = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationsData)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notificationFilter, setNotificationFilter] = useState<
    'all' | 'unread' | 'read'
  >('all')

  const notificationRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const navigate = useNavigate()

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'application':
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
            <Icon
              icon={UserRoundPlus}
              className={`stroke-[#2563EB]`}
              size="s"
            />
          </div>
        )
      case 'approval':
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
            <Icon icon={Check} className={`stroke-[#16A34A]`} size="s" />
          </div>
        )
      case 'rejection':
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
            <Icon icon={X} className={`stroke-[#DC2626]`} size="s" />
          </div>
        )
      case 'join':
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100">
            <Icon icon={UsersRound} className={`stroke-[#9333EA]`} size="s" />
          </div>
        )
      case 'study_end':
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100">
            <Icon
              icon={CalendarCheck}
              className={`stroke-[#EA580C]`}
              size="s"
            />
          </div>
        )
      default:
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <div className="h-5 w-5 rounded-full bg-gray-500" />
          </div>
        )
    }
  }

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen)
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
    navigate('/recruitment/manage')
    setIsNotificationOpen(false)
  }
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
    <header className="sticky top-0 z-2 flex h-16 w-full items-center justify-center px-20">
      <div className="flex h-full w-full max-w-7xl justify-between px-8">
        <div className="flex items-center gap-2">
          <p className="bg-primary-500 flex h-8 w-8 items-center justify-center rounded-lg text-base font-bold text-white">
            S
          </p>
          <p className="text-primary-600 text-xl font-bold">StudyHub</p>
        </div>
        <nav className="flex items-center gap-8">
          <a href="" className="flex items-center text-base text-gray-700">
            강의 목록
          </a>
          <a href="" className="flex items-center text-base text-gray-700">
            스터디 그룹
          </a>
          <a href="" className="flex items-center text-base text-gray-700">
            구인 공고
          </a>
          <div className="flex items-center gap-4">
            <button
              ref={buttonRef}
              className="relative flex size-10 items-center justify-center rounded-full"
              onClick={handleNotificationToggle}
            >
              <Icon icon={Bell} size="md" className={`stroke-gray-600`} />
              <p className="bg-danger-500 absolute -top-1 left-6 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-white">
                3
              </p>
              {isNotificationOpen && (
                <div
                  ref={notificationRef}
                  className="absolute top-12 right-0 z-2 max-h-[819.2px] w-96 overflow-hidden rounded-lg border border-gray-200 bg-white"
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
                      className={`flex w-2/3 items-center justify-center pt-3 pb-3.5 text-sm ${
                        notificationFilter === 'all'
                          ? 'border-primary-500 text-primary-600 border-[0px_0px_2px] border-solid'
                          : 'border-[0px_0px_2px] border-solid border-transparent text-gray-500'
                      }`}
                    >
                      전체보기 ({notifications.length})
                    </div>
                    <div
                      role="tab"
                      onClick={() => setNotificationFilter('unread')}
                      className={`flex w-2/3 items-center justify-center pt-3 pb-3.5 text-sm ${
                        notificationFilter === 'unread'
                          ? 'border-primary-500 text-primary-600 border-[0px_0px_2px] border-solid'
                          : 'border-[0px_0px_2px] border-solid border-transparent text-gray-500'
                      }`}
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
                      className={`flex w-2/3 items-center justify-center pt-3 pb-3.5 text-sm ${
                        notificationFilter === 'read'
                          ? 'border-primary-500 text-primary-600 border-[0px_0px_2px] border-solid'
                          : 'border-[0px_0px_2px] border-solid border-transparent text-gray-500'
                      }`}
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
                          {/* <div className="flex"> */}
                          <div className="flex flex-col gap-1">
                            {/* <div
                                  className={`-webkit-box relative h-10 w-[286px] shrink-0 flex-col justify-center overflow-hidden font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[0] overflow-ellipsis not-italic ${notification.isUnread ? 'text-gray-900' : 'text-gray-700'}`}
                                  style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                  }}
                                > */}
                            <p className="text-left text-sm text-gray-900">
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
                  icon={UserRound}
                  size="sm"
                  className={`stroke-primary-600`}
                />
              </div>
              <p className="text-base text-gray-700">김스터디</p>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
