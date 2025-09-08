import { RotateCcw } from 'lucide-react'
import { ActionButton } from './ActionButton'
import { BUTTON_TEXT } from '@src/constants/ui'
import { cn } from '@src/utils/cn'
import Button from '../button/Button'

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
      <Button
        variant="ghost"
        size="sm"
        buttonInnerText={BUTTON_TEXT.RESET_FILTER}
        icon={RotateCcw}
        iconSize="sm"
        onClick={onReset}
        className="text-gray-500 hover:text-gray-700"
      />
      {appliedFiltersCount > 0 && (
        <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
          {appliedFiltersCount}
        </span>
      )}
    </div>
  )
}
