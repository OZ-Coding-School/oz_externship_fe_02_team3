import { ActionButton } from './ActionButton'
import { cn } from '@src/utils/cn'

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
        더 보기
      </ActionButton>
    </div>
  )
}
