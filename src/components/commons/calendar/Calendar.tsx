import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DateTriggerButton from './DateTriggerButton'
import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './data-trigger-button.style'
import { format, isSameDay } from 'date-fns'
import { ko } from 'date-fns/locale'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react'
import { offset, shift } from '@floating-ui/dom'
import './Calendar.style.css'
import { Z_INDEX } from '@constants/ui'

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
  width,
  placeholder = '-/-/-',
  disabled,
  dateFormat = 'yyyy/MM/dd',
  variant = 'outline',
  size = 'md',
  fullWidth = false,
  className,
}: CalendarProps) {
  const triggerWidth = fullWidth ? undefined : width

  return (
    <ReactDatePicker
      selected={value}
      onChange={(d) => onChange(d)}
      dateFormat={dateFormat}
      disabled={disabled}
      withPortal={false}
      popperPlacement="bottom-start"
      popperModifiers={[offset(8), shift({ padding: 8 })]}
      shouldCloseOnSelect
      calendarClassName="inline-block rounded-xl bg-white p-3 shadow-xl ring-1 ring-black/5 border-0"
      popperClassName={`${Z_INDEX.DROPDOWN}`}
      wrapperClassName={fullWidth ? 'block w-full' : undefined}
      showPopperArrow={false}
      locale={ko}
      formatWeekDay={(n) => n.slice(0, 1)}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="mb-2 grid grid-cols-[2rem_1fr_2rem] items-center px-1">
          <button
            type="button"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="justify-self-start rounded p-1 hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3 justify-self-center">
            <span className="text-base font-semibold">
              {format(date, 'yyyy년 M월', { locale: ko })}
            </span>
            <button
              type="button"
              className="text-primary-500 hover:text-primary-500 text-sm font-semibold"
              onClick={() => onChange(new Date())}
            >
              오늘
            </button>
          </div>

          <button
            type="button"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="justify-self-end rounded p-1 hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}
      dayClassName={(d) =>
        [
          'rdp-day',
          value && isSameDay(d, value) ? 'rdp-day--selected' : '',
        ].join(' ')
      }
      /* 입력 버튼(트리거) */
      className={className}
      customInput={
        <DateTriggerButton
          placeholder={placeholder}
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          width={triggerWidth}
          disabled={disabled}
        />
      }
    />
  )
}
