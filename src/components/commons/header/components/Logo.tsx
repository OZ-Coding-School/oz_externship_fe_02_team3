import { Link } from 'react-router-dom'
import StudyLogo from '@assets/images/logo_studyhub.svg?react'
import { Menu as MenuIcon } from 'lucide-react'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
import Button from '../../button/Button'
interface LogoProps {
  toggleGnb: () => void
}
export default function Logo({ toggleGnb }: LogoProps) {
  const isDesktop = useMediaQuery('(min-width: 840px)')

  return (
    <div className="flex items-center gap-2">
      {!isDesktop && (
        <Button
          icon={MenuIcon}
          variant="ghost"
          className="h-6 w-6"
          onClick={toggleGnb}
        />
      )}
      <Link to="/" className="flex items-center gap-2">
        <StudyLogo
          className={`${isDesktop ? 'size-8' : 'size-7'}`}
          aria-label="StudyHub 로고"
        />
        {isDesktop && (
          <p className="text-primary-600 text-xl font-bold">StudyHub</p>
        )}
      </Link>
    </div>
  )
}
