import { NavigationButton } from './NavigationButton'
import { cn } from '@src/utils/cn'

interface SectionHeaderProps {
  title: string
  showNavigation?: boolean
  canNavigateLeft?: boolean
  canNavigateRight?: boolean
  onNavigateLeft?: () => void
  onNavigateRight?: () => void
  className?: string
}

export const SectionHeader = ({
  title,
  showNavigation = false,
  canNavigateLeft = false,
  canNavigateRight = false,
  onNavigateLeft,
  onNavigateRight,
  className,
}: SectionHeaderProps) => {
  return (
    <header className={cn('mb-6 flex items-center justify-between', className)}>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>

      {showNavigation && onNavigateLeft && onNavigateRight && (
        <nav className="flex gap-2" aria-label="강의 네비게이션">
          <NavigationButton
            direction="left"
            onClick={onNavigateLeft}
            isDisabled={!canNavigateLeft}
          />
          <NavigationButton
            direction="right"
            onClick={onNavigateRight}
            isDisabled={!canNavigateRight}
          />
        </nav>
      )}
    </header>
  )
}
