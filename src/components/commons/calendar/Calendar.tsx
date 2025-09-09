import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DateTriggerButton from './DateTriggerButton'
import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './data-trigger-button.style'
type RDPProps = React.ComponentProps<typeof ReactDatePicker>

type ButtonStyleProps = Pick<
  VariantProps<typeof buttonVariants>,
  'variant' | 'size' | 'fullWidth'
>

interface CalendarProps extends ButtonStyleProps {
  value: Date | null
  onChange: (d: Date | null) => void
  width?: number
  placeholder?: string
  disabled?: boolean
  dateFormat?: RDPProps['dateFormat']
  popperPlacement?: RDPProps['popperPlacement']
  withPortal?: boolean
  className?: string
}

export default function Calendar({
  value,
  onChange,
  width = 300,
  placeholder = '-/-/-',
  disabled,
  dateFormat = 'yyyy/MM/dd',
  popperPlacement = 'bottom-start',
  withPortal = true,
  variant = 'outline',
  size = 'md',
  fullWidth = false,
  className,
}: CalendarProps) {
  return (
    <ReactDatePicker
      selected={value}
      onChange={(d) => onChange(d)}
      dateFormat={dateFormat}
      disabled={disabled}
      popperPlacement={popperPlacement}
      withPortal={withPortal}
      className={className}
      customInput={
        <DateTriggerButton
          placeholder={placeholder}
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          width={width}
          disabled={disabled}
        />
      }
      showPopperArrow
    />
  )
}
