import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import Icon from './Icon'

interface DropDownProps {
  // 기존 props (하위 호환성 유지)
  dropdownTitle?: string

  // SelectableDropDown에서 가져온 새로운 props
  selected?: string
  options?: string[]
  onSelect?: (value: string) => void
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  leftIconClassName?: string
  rightIconClassName?: string
  width?: string
  disabled?: boolean
  placeholder?: string
}

function DropDown({
  dropdownTitle,
  selected,
  options = [],
  onSelect,
  leftIcon,
  rightIcon,
  leftIconClassName = '',
  rightIconClassName = '',
  width = 'w-[378px]', // 기존 너비 유지하되 커스터마이징 가능
  disabled = false,
  placeholder = '선택하세요',
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false)

  // dropdownTitle이 있으면 기존 방식, 없으면 새로운 방식
  const isStaticMode = dropdownTitle !== undefined
  const displayText = isStaticMode ? dropdownTitle : selected || placeholder

  const handleClick = () => {
    if (disabled || isStaticMode) return
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: string) => {
    onSelect?.(option)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div
        className={`relative flex h-[38px] ${width} items-center rounded-lg border border-gray-300 bg-white transition-colors ${
          !disabled && !isStaticMode ? 'cursor-pointer hover:bg-gray-50' : ''
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={handleClick}
      >
        {leftIcon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2">
            <Icon
              icon={leftIcon}
              size="sm"
              className={`stroke-gray-400 ${leftIconClassName}`}
            />
          </div>
        )}

        <p
          className={`text-sm ${leftIcon ? 'pl-10' : 'pl-4'} ${
            rightIcon ? 'pr-10' : 'pr-4'
          } ${
            !selected && !isStaticMode && !dropdownTitle ? 'text-gray-500' : ''
          }`}
        >
          {displayText}
        </p>

        {rightIcon && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <Icon
              icon={rightIcon}
              size="sm"
              className={`stroke-gray-400 transition-transform ${rightIconClassName} ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        )}
      </div>

      {/* 드롭다운 옵션 리스트 */}
      {isOpen && !isStaticMode && options.length > 0 && (
        <>
          {/* 배경 오버레이 (클릭 시 닫기) */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* 옵션 리스트 */}
          <div
            className={`absolute top-full left-0 z-20 mt-1 ${width} rounded-lg border border-gray-200 bg-white shadow-lg`}
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                  option === selected ? 'bg-primary-50 text-primary-600' : ''
                }`}
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

export default DropDown
