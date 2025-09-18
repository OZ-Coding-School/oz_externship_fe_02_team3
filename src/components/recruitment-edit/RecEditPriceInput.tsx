import { useMemo } from 'react'

interface RecEditPriceInputProps {
  value: string
  onChange: (raw: string) => void
  placeholder?: string
  disabled?: boolean
  inputClassName?: string
}

export default function RecEditPriceInput({
  value,
  onChange,
  placeholder = '미입력시 강의 비용 자동 계산',
  disabled,
  inputClassName,
}: RecEditPriceInputProps) {
  const formatNumber = (num: string) => {
    if (num === '') return ''
    const number = Number(num)
    if (Number.isNaN(number)) return ''
    return new Intl.NumberFormat('ko-KR').format(number)
  }

  const display = useMemo(() => formatNumber(value), [value])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = event.target.value
      .replace(/,/g, '')
      .replace(/[^\d]/g, '')
    const normalized = onlyDigits.replace(/^0+(?=\d)/, '')
    onChange(normalized)
  }

  const handleBlur = () => {
    if (value === '') return
    const normalized = String(Number(value))
    if (normalized !== value) onChange(normalized)
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      value={display}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={
        inputClassName ??
        'w-full rounded-[8px] border border-gray-300 px-[17px] py-[13px] focus:outline-none'
      }
      aria-label="예상 결제 비용"
    />
  )
}
