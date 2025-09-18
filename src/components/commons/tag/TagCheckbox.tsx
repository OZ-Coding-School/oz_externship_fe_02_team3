import { cn } from '@src/utils/cn'
import { useEffect, useId, useState } from 'react'
import Icon from '../Icon'
import { Check } from 'lucide-react'

interface TagCheckboxProps {
  label: string
  className?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

export default function TagCheckbox({
  label,
  className,
  checked,
  defaultChecked,
  onChange,
}: TagCheckboxProps) {
  const id = useId() //라벨과 input을 연결 해주기 위한 id
  const [innerChecked, setInnerChecked] = useState(defaultChecked ?? false) //수정 대비
  //input에 들어갈 최종 checked
  const isChecked = checked ?? innerChecked // 부모가 안 내려주면 -> innerChecked를 사용
  useEffect(() => {
    if (checked !== undefined) setInnerChecked(checked)
  }, [checked])

  const handleChange = (next: boolean) => {
    if (checked === undefined) setInnerChecked(next)
    onChange?.(next)
  }
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex h-12 w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3',
        isChecked
          ? 'border-primary-300 bg-primary-50'
          : 'hover:border-primary-300 border-gray-300',
        className
      )}
    >
      <span
        className={cn(
          'text-sm font-semibold',
          isChecked ? 'text-primary-900' : 'text-gray-900'
        )}
      >
        {label}
      </span>
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={isChecked}
        onChange={(e) => handleChange(e.target.checked)}
        aria-label={`${label} 선택`}
      />
      <span
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded-sm border-2 border-gray-300 peer-checked:border-none',
          'peer-checked:bg-primary-500 peer-checked:border-none'
        )}
      >
        {isChecked && <Icon icon={Check} className="h-3 w-3 text-white" />}
      </span>
    </label>
  )
}
