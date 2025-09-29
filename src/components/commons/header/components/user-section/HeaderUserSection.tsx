import UserMenu from './UserMenu'
import AuthMenu from './AuthMenu'
import NotificationButton from '@src/components/commons/header/components/notification-section/NotificationButton'
import { useState } from 'react'
import { useAuth } from '@src/store/auth'

export default function HeaderUserSection() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  // 개발단계에선 해당 값을 true 와 false 로 합니다.
  // 개발단계에선 유저 이름을 '김스터디' 로 합니다.
  // const user = true
  // const userName = '김스터디'

  const isLoggedIn = useAuth((state) => state.isLoggedIn())
  const userNickname = useAuth((state) => state.user?.nickname ?? '사용자')
  console.log(userNickname)

  return (
    <div className="flex items-center gap-4">
      {isLoggedIn ? (
        <>
          <NotificationButton
            isNotificationOpen={isNotificationOpen}
            setIsNotificationOpen={setIsNotificationOpen}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
          />
          <UserMenu
            isNotificationOpen={isNotificationOpen}
            setIsNotificationOpen={setIsNotificationOpen}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
            userNickname={userNickname}
          />
        </>
      ) : (
        <AuthMenu />
      )}
    </div>
  )
}
