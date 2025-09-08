import { Z_INDEX } from '@constants/ui'
<<<<<<< HEAD
import { cn } from '@utils/cn'
=======
>>>>>>> 16c261fcf52b39541fff7e6539f2a6b304cd37ec
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
