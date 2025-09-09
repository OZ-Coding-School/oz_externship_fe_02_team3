import { forwardRef } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants, labelVariants } from './data-trigger-button.style'
import { cn } from '@src/utils/cn'

export interface DateTriggerButtonProps
  extends VariantProps<typeof buttonVariants> {
  value?: string
  placeholder?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  width?: number
}

const DateTriggerButton = forwardRef<HTMLButtonElement, DateTriggerButtonProps>(
  (
    {
      value,
      placeholder = '-/-/-',
      onClick,
      disabled,
      className,
      width,
      variant,
      size,
      fullWidth,
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
        style={{ width: width }}
      >
        <span className={labelVariants({ hasValue: !!value })}>
          {value || placeholder}
        </span>
        <CalendarIcon className="h-5 w-5" />
      </button>
    )
  }
)

// customInput을 사용하기 때문에 forwardRef를 사용하여 감싸줘야하기에 const를 사용.
DateTriggerButton.displayName = 'DateTriggerButton'
export default DateTriggerButton
