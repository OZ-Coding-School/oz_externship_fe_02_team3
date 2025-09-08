import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'

import Logo from './components/Logo'
import Navigation from './components/Navigation'

export default function Header() {
  return (
    <header
      className={cn(
        'sticky top-0 flex h-16 w-full items-center justify-center border-b border-gray-200 px-20',
        `z-[${Z_INDEX.HEADER}]`
      )}
    >
      <div className="flex h-full w-full max-w-7xl justify-between bg-white px-8">
        <Logo />
        <Navigation />
      </div>
    </header>
  )
}
