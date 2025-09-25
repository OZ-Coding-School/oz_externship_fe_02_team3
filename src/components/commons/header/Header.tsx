import Logo from './components/Logo'
import Navigation from './components/Navigation'
import MobileSideMenu from './components/MobileSideMenu'
import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import { useRef, useState } from 'react'
import { useOutsideClick } from '@src/hooks/useOutsideClick'
export default function Header() {
  const [isGnbVisible, setIsGnbVisible] = useState(false)
  const sidebarButtonRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const toggleGnb = () => {
    setIsGnbVisible((prev) => !prev)
  }

  useOutsideClick(
    isGnbVisible, // 드롭다운이 열려있는지
    [sidebarButtonRef, sidebarRef], // 안쪽으로 취급할 영역들
    () => setIsGnbVisible(false) // 바깥 클릭시 실행할 함수
  )

  return (
    <header
      className={cn(
        'custom:px-20 sticky top-0 flex h-16 w-full items-center justify-center border-b border-gray-200 bg-white px-0',
        `${Z_INDEX.HEADER}`
      )}
    >
      <div className="flex h-full w-full max-w-7xl justify-between px-8">
        <Logo toggleGnb={toggleGnb} sidebarButtonRef={sidebarButtonRef} />
        <Navigation />
      </div>
      <MobileSideMenu
        isGnbVisible={isGnbVisible}
        toggleGnb={toggleGnb}
        sidebarRef={sidebarRef}
      />
    </header>
  )
}
