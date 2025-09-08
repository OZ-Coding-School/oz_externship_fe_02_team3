import Button from '../commons/button/Button'
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
      <Button
        variant="secondary"
        size="base"
        buttonInnerText={isLoading ? '로딩중...' : BUTTON_TEXT.LOAD_MORE}
        onClick={onClick}
        disabled={isDisabled || isLoading}
        className="min-w-[120px]"
      />
    </div>
  )
}
