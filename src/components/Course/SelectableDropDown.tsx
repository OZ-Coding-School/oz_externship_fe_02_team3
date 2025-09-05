import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import Icon from '../Icon'
import { cn } from '../../utils/cn'

interface SelectableDropDownProps {
  selected: string
  options: string[]
  onSelect: (value: string) => void
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  leftIconClassName?: string
  rightIconClassName?: string
  width?: string
  disabled?: boolean
  placeholder?: string
}

const SelectableDropDown = ({
  selected,
  options,
  onSelect,
  leftIcon,
  rightIcon,
  leftIconClassName = '',
  rightIconClassName = '',
  width = 'w-full',
  disabled = false,
  placeholder = '선택하세요',
}: SelectableDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (disabled) return
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: string) => {
    onSelect(option)
    setIsOpen(false)
  }

  const displayText = selected || placeholder

  return (
    <div className="relative">
      <div
        className={cn(
          'relative flex h-[38px] items-center rounded-lg border border-gray-300 bg-white transition-colors',
          width,
          !disabled && 'cursor-pointer hover:bg-gray-50',
          disabled && 'cursor-not-allowed opacity-50'
        )}
        onClick={handleClick}
      >
        {leftIcon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2">
            <Icon
              icon={leftIcon}
              size="sm"
              className={cn('stroke-gray-400', leftIconClassName)}
            />
          </div>
        )}

        <p
          className={cn(
            'text-sm',
            leftIcon ? 'pl-10' : 'pl-4',
            rightIcon ? 'pr-10' : 'pr-4',
            !selected && 'text-gray-500'
          )}
        >
          {displayText}
        </p>

        {rightIcon && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <Icon
              icon={rightIcon}
              size="sm"
              className={cn(
                'stroke-gray-400 transition-transform',
                rightIconClassName,
                isOpen && 'rotate-180'
              )}
            />
          </div>
        )}
      </div>

      {/* 드롭다운 옵션 리스트 */}
      {isOpen && (
        <>
          {/* 배경 오버레이 (클릭 시 닫기) */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* 옵션 리스트 */}
          <div
            className={cn(
              'absolute top-full left-0 z-20 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg',
              width
            )}
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50',
                  'first:rounded-t-lg last:rounded-b-lg',
                  option === selected && 'bg-primary-50 text-primary-600'
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SelectableDropDown
