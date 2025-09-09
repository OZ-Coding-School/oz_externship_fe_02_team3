import Icon from '@components/commons/Icon'
import PageLink from '@components/commons/page-link/PageLink'
import { Z_INDEX } from '@constants/ui'
import { useOutsideClick } from '@src/hooks/useOutsideClick'
import { cn } from '@utils/cn'
import { UserRound as UserRoundIcon, LogOut as LogOutIcon } from 'lucide-react'
import { useRef } from 'react'

interface UserMenuProps {
  isNotificationOpen: boolean
  setIsNotificationOpen: (isNotificationOpen: boolean) => void
  isUserMenuOpen: boolean
  setIsUserMenuOpen: (isUserMenuOpen: boolean) => void
  userName: string
}

export default function UserMenu({
  isNotificationOpen,
  setIsNotificationOpen,
  isUserMenuOpen,
  setIsUserMenuOpen,
  userName,
}: UserMenuProps) {
  const userMenuButtonRef = useRef<HTMLDivElement>(null)
  const userMenuPanelRef = useRef<HTMLDivElement>(null)
  const handleAvatarToggle = () => {
    // 알림드롭다운 ui 가 열려있다면 알림드롭다운 닫기
    if (isNotificationOpen) {
      setIsNotificationOpen(false)
    }
    // 마이페이지 ui 토글
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  useOutsideClick(isUserMenuOpen, [userMenuButtonRef, userMenuPanelRef], () =>
    setIsUserMenuOpen(false)
  )

  return (
    <div
      ref={userMenuButtonRef}
      className="relative flex items-center gap-2"
      onClick={handleAvatarToggle}
    >
      <div className="bg-primary-100 flex h-8 w-8 items-center justify-center rounded-full">
        <Icon icon={UserRoundIcon} size="sm" className={`stroke-primary-600`} />
      </div>

      <p className="text-base text-gray-700">{userName}</p>
      {isUserMenuOpen && (
        <div
          ref={userMenuPanelRef}
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
            iconClassName="rotate-180"
            className="text-sm text-gray-700"
            fontWeight="normal"
            icon={LogOutIcon}
          />
        </div>
      )}
    </div>
  )
}
