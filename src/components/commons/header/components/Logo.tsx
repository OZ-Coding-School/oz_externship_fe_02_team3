import StudyLogo from '@assets/images/logo_studyhub.svg?react'
import { Menu as MenuIcon } from 'lucide-react'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
import Button from '@components/commons/button/Button'
import { EXTERNAL } from '@src/constants/external'

interface LogoProps {
  toggleGnb: () => void
  sidebarButtonRef: React.RefObject<HTMLDivElement | null>
}
export default function Logo({ toggleGnb, sidebarButtonRef }: LogoProps) {
  const isDesktop = useMediaQuery('(min-width: 840px)')

  return (
    <div className="flex items-center gap-2">
      {!isDesktop && (
        <div ref={sidebarButtonRef}>
          <Button
            icon={MenuIcon}
            variant="ghost"
            className="h-6 w-6"
            onClick={toggleGnb}
          />
        </div>
      )}
      <a href={EXTERNAL.ACCOUNT_ROOT} className="flex items-center gap-2">
        <StudyLogo
          className={`${isDesktop ? 'size-8' : 'size-7'}`}
          aria-label="StudyHub 로고"
        />
        {isDesktop && (
          <p className="text-primary-600 text-xl font-bold">StudyHub</p>
        )}
      </a>
    </div>
  )
}
