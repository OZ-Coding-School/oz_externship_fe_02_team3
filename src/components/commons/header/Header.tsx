import Logo from './components/Logo'
import Navigation from './components/Navigation'
import MobileSideMenu from './components/MobileSideMenu'
import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import { useState } from 'react'

export default function Header() {
  const [isGnbVisible, setIsGnbVisible] = useState(false)
  const toggleGnb = () => {
    setIsGnbVisible((prev) => !prev)
  }

  return (
    <header
      className={cn(
        'custom:px-20 sticky top-0 flex h-16 w-full items-center justify-center border-b border-gray-200 bg-white px-0',
        `${Z_INDEX.HEADER}`
      )}
    >
      <div className="flex h-full w-full max-w-7xl justify-between px-8">
        <Logo toggleGnb={toggleGnb} />
        <Navigation />
      </div>
      {isGnbVisible && (
        <MobileSideMenu isGnbVisible={isGnbVisible} toggleGnb={toggleGnb} />
      )}
    </header>
  )
}
