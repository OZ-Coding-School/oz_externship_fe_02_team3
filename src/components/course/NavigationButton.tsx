import { cn } from '@src/utils/cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NavigationButtonProps {
  direction: 'left' | 'right'
  onClick: () => void
  isDisabled: boolean
  className?: string
}

export function NavigationButton({
  direction,
  onClick,
  isDisabled,
  className,
}: NavigationButtonProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  const ariaLabel = direction === 'left' ? '이전 강의 보기' : '다음 강의 보기'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      className={cn(
        'rounded-full border p-2 transition-colors',
        isDisabled
          ? 'cursor-not-allowed border-gray-200 text-gray-400'
          : 'focus:ring-primary-500 cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:outline-none',
        className
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}
