import StudyLogo from '@assets/images/logo_studyhub.svg?react'
import { X as XIcon, LogOut as LogOutIcon } from 'lucide-react'
import { NAV_ITEMS } from '@src/constants/ui'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '@components/commons/Icon'
import { Z_INDEX } from '@constants/ui'
import Avatar from '@src/components/recruitment-manage/common/Avatar'
import Button from '../../button/Button'
interface MobileSideMenuProps {
  isGnbVisible: boolean
  toggleGnb: () => void
}
export default function MobileSideMenu({
  isGnbVisible,
  toggleGnb,
}: MobileSideMenuProps) {
  // 개발단계에선 해당 값을 true 와 false 로 합니다.
  // 개발단계에선 유저 이름을 '김스터디' 로 합니다.
  // 개발단계에선 유저 이메일을 'kim.dev@example.com' 로 합니다.
  const user = true
  const userName = '김스터디'
  const userEmail = 'kim.dev@example.com'

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/logout')
  }

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-2/3 bg-white ${Z_INDEX.SIDEBAR} shadow-lg transition-transform duration-300 ${
        isGnbVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <StudyLogo className="size-8" aria-label="StudyHub 로고" />
        <XIcon size={18} className="text-gray-400" />
      </div>
      <div className="flex h-[calc(100vh-65px)] flex-col justify-between">
        <div className="flex flex-col gap-4 p-4">
          <p className="px-3 py-2 text-sm font-semibold text-gray-500">메뉴</p>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="hover:bg-primary-50 hover:text-primary-600 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-gray-700"
                >
                  <div className="">
                    <Icon icon={item.icon} size="sm" />
                  </div>
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        {user && (
          <div className="flex flex-col justify-center gap-4 border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <Avatar
                src={`https://i.pravatar.cc/150?img=3`}
                alt={userName}
                size="md"
              />
              <div className="flex flex-col justify-around">
                <p className="text-sm font-semibold text-gray-900">
                  {userName}
                </p>
                <p className="text-xs text-gray-600">{userEmail}</p>
              </div>
            </div>
            <Button
              buttonInnerText="로그아웃"
              variant="secondary"
              onClick={handleLogout}
              iconClassName="rotate-180"
              className="w-full gap-3 bg-gray-100 text-sm text-gray-700"
              fontWeight="normal"
              icon={LogOutIcon}
              iconSize="sm"
            />
          </div>
        )}
      </div>
    </div>
  )
}
