import { RotateCcw } from 'lucide-react'
import { ActionButton } from './ActionButton'
import { BUTTON_TEXT } from '@src/constants/ui'
import { cn } from '@src/utils/cn'

interface FilterResetButtonProps {
  onReset: () => void
  appliedFiltersCount: number
  className?: string
}

export function FilterResetButton({
  onReset,
  appliedFiltersCount,
  className,
}: FilterResetButtonProps) {
  if (appliedFiltersCount === 0) {
    return null
  }

  return (
    <div className={cn('flex items-center justify-end', className)}>
      <ActionButton
        variant="ghost"
        size="small"
        onClick={onReset}
        className="text-gray-500 hover:text-gray-700"
      >
        <RotateCcw className="mr-1 h-4 w-4" />
        {BUTTON_TEXT.RESET_FILTER}
        {appliedFiltersCount > 0 && (
          <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
            {appliedFiltersCount}
          </span>
        )}
      </ActionButton>
    </div>
  )
}
