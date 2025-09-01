import Icon from '@components/Icon'
import { Bell, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'

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
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'application':
        return (
          <div className="relative flex size-8 shrink-0 content-stretch items-center justify-center rounded-[9999px] bg-blue-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 12 13">
              <path
                d="M5.83125 4.515V3.30167C5.45805 3.43389 5.0693 3.5 4.665 3.5C4.03522 3.5 3.44821 3.34056 2.90396 3.02167C2.37526 2.71056 1.95541 2.29056 1.64441 1.76167C1.32564 1.21722 1.16625 0.63 1.16625 0H0C0 0.847778 0.213812 1.63333 0.641437 2.35667C1.05351 3.05667 1.60942 3.61278 2.30917 4.025C3.03225 4.45278 3.81753 4.66667 4.665 4.66667C5.06152 4.66667 5.45027 4.61611 5.83125 4.515ZM4.665 5.25C4.02745 5.25 3.44044 5.40944 2.90396 5.72833C2.37526 6.03944 1.95541 6.45944 1.64441 6.98833C1.32564 7.525 1.16625 8.11222 1.16625 8.75C1.16625 9.38778 1.32564 9.975 1.64441 10.5117C1.95541 11.0406 2.37526 11.4606 2.90396 11.7717C3.44044 12.0906 4.02745 12.25 4.665 12.25C5.30255 12.25 5.88956 12.0906 6.42604 11.7717C6.95474 11.4606 7.37459 11.0406 7.68559 10.5117C8.00436 9.975 8.16375 9.38778 8.16375 8.75C8.16375 8.11222 8.00436 7.525 7.68559 6.98833C7.37459 6.45944 6.95474 6.03944 6.42604 5.72833C5.88956 5.40944 5.30255 5.25 4.665 5.25ZM4.665 6.41667C5.08485 6.41667 5.4736 6.52167 5.83125 6.73167C6.1889 6.94167 6.47269 7.22556 6.68261 7.58333C6.89254 7.94111 6.9975 8.33 6.9975 8.75C6.9975 9.17 6.89254 9.55889 6.68261 9.91667C6.47269 10.2744 6.1889 10.5583 5.83125 10.7683C5.4736 10.9783 5.08485 11.0833 4.665 11.0833C4.24515 11.0833 3.8564 10.9783 3.49875 10.7683C3.1411 10.5583 2.85731 10.2744 2.64739 9.91667C2.43746 9.55889 2.3325 9.17 2.3325 8.75C2.3325 8.33 2.43746 7.94111 2.64739 7.58333C2.85731 7.22556 3.1411 6.94167 3.49875 6.73167C3.8564 6.52167 4.24515 6.41667 4.665 6.41667ZM8.16375 2.91667V4.66667H9.33V2.91667H11.0794V1.75H9.33V0H8.16375V1.75H6.41437V2.91667H8.16375Z"
                fill="#2563EB"
              />
            </svg>
          </div>
        )
      case 'approval':
        return (
          <div className="relative flex size-8 shrink-0 content-stretch items-center justify-center rounded-[9999px] bg-green-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 10 8">
              <path
                d="M3.70867 1.65667L9.07342 7.02333L9.8898 6.195L3.70867 0L0 3.72167L0.816375 4.53833L3.70867 1.65667Z"
                fill="#16A34A"
              />
            </svg>
          </div>
        )
      case 'rejection':
        return (
          <div className="relative flex size-8 shrink-0 content-stretch items-center justify-center rounded-[9999px] bg-red-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 8 8">
              <path
                d="M3.70867 4.53833L6.58931 7.42L7.41735 6.59167L4.53671 3.71L7.41735 0.828333L6.58931 0L3.70867 2.88167L0.828037 0L0 0.828333L2.88064 3.71L0 6.59167L0.828037 7.42L3.70867 4.53833Z"
                fill="#DC2626"
              />
            </svg>
          </div>
        )
      case 'join':
        return (
          <div className="relative flex size-8 shrink-0 content-stretch items-center justify-center rounded-[9999px] bg-purple-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 12 12">
              <path
                d="M5.83125 6.41667C6.35995 6.41667 6.84783 6.28639 7.29489 6.02583C7.74196 5.76528 8.09572 5.41139 8.35618 4.96417C8.61664 4.51694 8.74687 4.02889 8.74687 3.5V0H7.58062V3.5C7.58062 3.80333 7.50676 4.08528 7.35904 4.34583C7.21131 4.60639 7.01305 4.81639 6.76425 4.97583C6.51545 5.13528 6.23944 5.22667 5.93621 5.25H5.83125C5.52802 5.25 5.24618 5.17611 4.98572 5.02833C4.72526 4.88056 4.51533 4.68222 4.35594 4.43333C4.19656 4.18444 4.1052 3.90833 4.08187 3.605V0H2.91562V3.5C2.91562 4.02889 3.04586 4.51694 3.30632 4.96417C3.56678 5.41139 3.92054 5.76528 4.36761 6.02583C4.81467 6.28639 5.30255 6.41667 5.83125 6.41667ZM2.04094 4.66667C2.20421 4.66667 2.3636 4.64722 2.5191 4.60833C2.41802 4.31278 2.35582 4.00944 2.3325 3.69833V3.45333C2.26252 3.47667 2.19255 3.49222 2.12257 3.5H2.04094C1.81546 3.5 1.61914 3.42417 1.45198 3.2725C1.28482 3.12083 1.18957 2.93222 1.16625 2.70667V2.625V0H0V2.625C0 2.99833 0.0913562 3.34056 0.274069 3.65167C0.456781 3.96278 0.703638 4.20972 1.01464 4.3925C1.32564 4.57528 1.66774 4.66667 2.04094 4.66667ZM9.62156 4.66667C9.99476 4.66667 10.3369 4.57528 10.6479 4.3925C10.9589 4.20972 11.2057 3.96278 11.3884 3.65167C11.5711 3.34056 11.6625 2.99833 11.6625 2.625V0H10.4962V2.625C10.4962 2.85056 10.4204 3.04694 10.2688 3.21417C10.1172 3.38139 9.92867 3.47667 9.7032 3.5H9.62156C9.52049 3.5 9.4233 3.48444 9.33 3.45333V3.5C9.33 3.88111 9.27169 4.25056 9.15506 4.60833C9.30279 4.64722 9.45829 4.66667 9.62156 4.66667ZM2.04094 8.16667C2.30529 8.16667 2.54826 8.10056 2.76984 7.96833C2.99143 7.83611 3.16831 7.65917 3.30049 7.4375C3.43266 7.21583 3.49875 6.97278 3.49875 6.70833C3.49875 6.44389 3.43266 6.20083 3.30049 5.97917C3.16831 5.7575 2.99143 5.58056 2.76984 5.44833C2.54826 5.31611 2.30529 5.25 2.04094 5.25C1.77659 5.25 1.53362 5.31611 1.31203 5.44833C1.09044 5.58056 0.913562 5.7575 0.781387 5.97917C0.649213 6.20083 0.583125 6.44389 0.583125 6.70833C0.583125 6.97278 0.649213 7.21583 0.781387 7.4375C0.913562 7.65917 1.09044 7.83611 1.31203 7.96833C1.53362 8.10056 1.77659 8.16667 2.04094 8.16667ZM9.62156 8.16667C9.88591 8.16667 10.1289 8.10056 10.3505 7.96833C10.5721 7.83611 10.7489 7.65917 10.8811 7.4375C11.0133 7.21583 11.0794 6.97278 11.0794 6.70833C11.0794 6.44389 11.0133 6.20083 10.8811 5.97917C10.7489 5.7575 10.5721 5.58056 10.3505 5.44833C10.1289 5.31611 9.88591 5.25 9.62156 5.25C9.35721 5.25 9.11424 5.31611 8.89266 5.44833C8.67107 5.58056 8.49419 5.7575 8.36201 5.97917C8.22984 6.20083 8.16375 6.44389 8.16375 6.70833C8.16375 6.97278 8.22984 7.21583 8.36201 7.4375C8.49419 7.65917 8.67107 7.83611 8.89266 7.96833C9.11424 8.10056 9.35721 8.16667 9.62156 8.16667ZM2.04094 7C1.96319 7 1.89516 6.97083 1.83684 6.9125C1.77853 6.85417 1.74937 6.78611 1.74937 6.70833C1.74937 6.63056 1.77853 6.5625 1.83684 6.50417C1.89516 6.44583 1.96319 6.41667 2.04094 6.41667C2.11869 6.41667 2.18672 6.44583 2.24503 6.50417C2.30334 6.5625 2.3325 6.63056 2.3325 6.70833C2.3325 6.78611 2.30334 6.85417 2.24503 6.9125C2.18672 6.97083 2.11869 7 2.04094 7ZM9.62156 7C9.54381 7 9.47578 6.97083 9.41747 6.9125C9.35916 6.85417 9.33 6.78611 9.33 6.70833C9.33 6.63056 9.35916 6.5625 9.41747 6.50417C9.47578 6.44583 9.54381 6.41667 9.62156 6.41667C9.69931 6.41667 9.76734 6.44583 9.82566 6.50417C9.88397 6.5625 9.91312 6.63056 9.91312 6.70833C9.91312 6.78611 9.88397 6.85417 9.82566 6.9125C9.76734 6.97083 9.69931 7 9.62156 7ZM5.83125 11.6667C6.2511 11.6667 6.63985 11.5617 6.9975 11.3517C7.35515 11.1417 7.63894 10.8578 7.84886 10.5C8.05879 10.1422 8.16375 9.75333 8.16375 9.33333C8.16375 8.91333 8.05879 8.52444 7.84886 8.16667C7.63894 7.80889 7.35515 7.525 6.9975 7.315C6.63985 7.105 6.2511 7 5.83125 7C5.4114 7 5.02265 7.105 4.665 7.315C4.30735 7.525 4.02356 7.80889 3.81364 8.16667C3.60371 8.52444 3.49875 8.91333 3.49875 9.33333C3.49875 9.75333 3.60371 10.1422 3.81364 10.5C4.02356 10.8578 4.30735 11.1417 4.665 11.3517C5.02265 11.5617 5.4114 11.6667 5.83125 11.6667ZM5.83125 10.5C5.62132 10.5 5.42695 10.4475 5.24812 10.3425C5.0693 10.2375 4.92741 10.0956 4.82244 9.91667C4.71748 9.73778 4.665 9.54333 4.665 9.33333C4.665 9.12333 4.71748 8.92889 4.82244 8.75C4.92741 8.57111 5.0693 8.42917 5.24812 8.32417C5.42695 8.21917 5.62132 8.16667 5.83125 8.16667C6.04117 8.16667 6.23555 8.21917 6.41437 8.32417C6.5932 8.42917 6.73509 8.57111 6.84006 8.75C6.94502 8.92889 6.9975 9.12333 6.9975 9.33333C6.9975 9.54333 6.94502 9.73778 6.84006 9.91667C6.73509 10.0956 6.5932 10.2375 6.41437 10.3425C6.23555 10.4475 6.04117 10.5 5.83125 10.5Z"
                fill="#9333EA"
              />
            </svg>
          </div>
        )
      case 'study_end':
        return (
          <div className="relative flex size-8 shrink-0 content-stretch items-center justify-center rounded-[9999px] bg-orange-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 12 12">
              <path
                d="M4.08187 11.6667V10.5H7.58062V11.6667H8.74687V10.5H11.0794C11.2426 10.5 11.3807 10.4436 11.4934 10.3308C11.6061 10.2181 11.6625 10.08 11.6625 9.91667V0.583333C11.6625 0.42 11.6061 0.281944 11.4934 0.169167C11.3807 0.0563889 11.2426 0 11.0794 0H0.583125C0.41985 0 0.281844 0.0563889 0.169106 0.169167C0.0563687 0.281944 0 0.42 0 0.583333V9.91667C0 10.08 0.0563687 10.2181 0.169106 10.3308C0.281844 10.4436 0.41985 10.5 0.583125 10.5H2.91562V11.6667H4.08187ZM10.4962 6.41667H1.16625V1.16667H10.4962V6.41667ZM7.60395 5.75167L8.42032 4.92333L5.53969 2.04167L3.47542 4.10667L4.30346 4.92333L5.53969 3.68667L7.60395 5.75167ZM2.91562 9.33333H1.16625V7.58333H10.4962V9.33333H8.74687V8.75H7.58062V9.33333H4.08187V8.75H2.91562V9.33333Z"
                fill="#EA580C"
              />
            </svg>
          </div>
        )
      default:
        return (
          <div className="relative flex size-8 shrink-0 content-stretch items-center justify-center rounded-[9999px] bg-gray-100">
            <div className="h-5 w-5 rounded-full bg-gray-500"></div>
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
        return notifications.filter((n) => n.isUnread)
      case 'read':
        return notifications.filter((n) => n.isRead)
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
              className="relative flex size-10 items-center justify-center rounded-full"
              onClick={handleNotificationToggle}
            >
              <Icon icon={Bell} size="md" className={`stroke-gray-600`} />
              <p className="bg-danger-500 absolute -top-1 left-6 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-white">
                3
              </p>
              {isNotificationOpen && (
                <div className="absolute top-12 right-0 z-2 h-[475px] max-h-[819.2px] w-96 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between px-4 pt-4 pb-[17px]">
                    <h3 className="flex items-center justify-start text-lg font-semibold text-gray-900">
                      알림
                    </h3>
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-primary-600 flex items-center justify-center text-center text-sm"
                    >
                      모두 읽음
                    </button>
                  </div>

                  <div className="flex">
                    <button
                      onClick={() => setNotificationFilter('all')}
                      className={`flex w-2/3 items-center justify-center pt-3 pb-3.5 text-sm ${
                        notificationFilter === 'all'
                          ? 'border-primary-500 text-primary-600 border-[0px_0px_2px] border-solid'
                          : 'border-[0px_0px_2px] border-solid border-transparent text-gray-500'
                      }`}
                    >
                      전체보기 ({notifications.length})
                    </button>
                    <button
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
                    </button>
                    <button
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
                    </button>
                  </div>

                  {/* <div className="relative flex h-80 max-h-80 w-[382px] shrink-0 flex-col content-stretch items-start justify-start overflow-y-auto"> */}
                  <div className="flex flex-col">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`${notification.isUnread ? 'bg-yellow-50' : 'bg-white'} relative box-border flex h-[93px] w-[382px] shrink-0 flex-col content-stretch items-start justify-start px-4 pt-[17px] pb-4`}
                      >
                        {notification.id !== filteredNotifications[0].id && (
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 border-[1px_0px_0px] border-solid border-gray-100"
                          />
                        )}
                        <div className="relative flex h-[60px] w-[350px] shrink-0 content-stretch items-start justify-start">
                          {getNotificationIcon(notification.type)}
                          <div className="relative box-border flex shrink-0 content-stretch items-start justify-start py-0 pr-0 pl-3">
                            <div className="relative flex h-[60px] w-[286px] shrink-0 flex-col content-stretch items-start justify-start">
                              <div className="relative flex h-10 w-[286px] shrink-0 flex-wrap content-start items-start justify-start gap-0">
                                <div
                                  className={`-webkit-box relative h-10 w-[286px] shrink-0 flex-col justify-center overflow-hidden font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[0] overflow-ellipsis not-italic ${notification.isUnread ? 'text-gray-900' : 'text-gray-700'}`}
                                  style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                  }}
                                >
                                  <p className="leading-[20px]">
                                    {notification.message}
                                  </p>
                                </div>
                              </div>
                              <div className="relative box-border flex shrink-0 content-stretch items-start justify-start px-0 pt-1 pb-0">
                                <div className="relative flex h-4 w-[286px] shrink-0 content-stretch items-center justify-start font-['Roboto:Regular',_'Noto_Sans_KR:Regular',_sans-serif] text-[12px] text-gray-500">
                                  {notification.date}
                                </div>
                              </div>
                            </div>
                          </div>
                          {notification.isUnread && (
                            <div className="relative box-border flex shrink-0 content-stretch items-start justify-start pt-2 pr-0 pb-0 pl-3">
                              <div className="size-2 shrink-0 rounded-[9999px] bg-yellow-500" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* </div> */}

                  {/* Footer */}
                  <div className="relative box-border flex h-[45px] w-[382px] shrink-0 flex-col content-stretch items-start justify-start bg-gray-50 px-3 pt-[13px] pb-3">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 border-[1px_0px_0px] border-solid border-gray-200"
                    />
                    <div className="h-5 w-[358px] shrink-0" />
                  </div>
                  {/* <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[8px] border border-solid border-gray-200 shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)]"
                  /> */}
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
