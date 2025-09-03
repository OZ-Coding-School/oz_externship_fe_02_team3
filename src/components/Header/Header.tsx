import { Z_INDEX } from '@constants/ui'

import Logo from '@components/Header/components/Logo'
import Navigation from '@components/Header/components/Navigation'

const Header = () => {
  return (
    <header
      className={`sticky top-0 z-[${Z_INDEX.HEADER}] flex h-16 w-full items-center justify-center px-20`}
    >
      <div className="flex h-full w-full max-w-7xl justify-between bg-white px-8">
        <Logo />
        <Navigation />
      </div>
    </header>
  )
}

export default Header
