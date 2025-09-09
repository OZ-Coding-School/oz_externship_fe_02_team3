import UserMenu from './UserMenu'
import AuthMenu from './AuthMenu'
import NotificationButton from '@src/components/commons/header/components/notification-section/NotificationButton'
import { useState } from 'react'

export default function HeaderUserSection() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  // 개발단계에선 해당 값을 true 와 false 로 합니다.
  // 개발단계에선 유저 이름을 '김스터디' 로 합니다.
  const user = true
  const userName = '김스터디'

  return (
    <div className="flex items-center gap-4">
      {user ? (
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
            userName={userName}
          />
        </>
      ) : (
        <AuthMenu />
      )}
    </div>
  )
}
