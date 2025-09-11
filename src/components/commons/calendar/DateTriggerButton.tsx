import { forwardRef } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants, labelVariants } from './data-trigger-button.style'
import { cn } from '@src/utils/cn'

export interface DateTriggerButtonProps
  extends VariantProps<typeof buttonVariants> {
  value?: string
  onClick?: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
  width?: number
}

const DateTriggerButton = forwardRef<HTMLButtonElement, DateTriggerButtonProps>(
  (
    {
      value,
      onClick,
      disabled,
      className,
      width,
      variant,
      size,
      fullWidth,
      placeholder = '-/-/-',
    },
    ref
  ) => {
    return (
      <button
        type="button"
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        style={{ width }}
      >
        <span className={labelVariants({ hasValue: !!value })}>
          {value || placeholder}
        </span>
        <CalendarIcon className="h-5 w-5" />
      </button>
    )
  }
)

DateTriggerButton.displayName = 'DateTriggerButton'
export default DateTriggerButton
