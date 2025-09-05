import { ActionButton } from './ActionButton'
import { cn } from '@src/utils/cn'
import { BUTTON_TEXT } from '@src/constants/ui'

interface LoadMoreButtonProps {
  onClick: () => void
  isDisabled?: boolean
  isLoading?: boolean
  className?: string
}

export default function LoadMoreButton({
  onClick,
  isDisabled = false,
  isLoading = false,
  className,
}: LoadMoreButtonProps) {
  return (
    <div className={cn('mt-12 flex justify-center', className)}>
      <ActionButton
        variant="secondary"
        size="medium"
        onClick={onClick}
        disabled={isDisabled}
        isLoading={isLoading}
      >
        {BUTTON_TEXT.LOAD_MORE}
      </ActionButton>
    </div>
  )
}
