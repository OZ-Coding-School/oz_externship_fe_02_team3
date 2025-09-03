import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

interface DropDownProps {
  selected?: string
  options?: string[]
  onSelect?: (value: string) => void
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  leftIconClassName?: string
  rightIconClassName?: string
  disabled?: boolean
  placeholder?: string
  className?: string
}

export default function DropDown({
  selected,
  options = [],
  onSelect,
  leftIcon,
  rightIcon,
  leftIconClassName = '',
  rightIconClassName = '',
  className = '',
  disabled = false,
  placeholder = '선택하세요',
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const displayText = selected || placeholder

  const handleClick = () => {
    if (disabled) return
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: string) => {
    onSelect?.(option)
    setIsOpen(false)
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`relative flex ${className} items-center rounded-lg border border-gray-300 py-[9px] ${
          !disabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
        }`}
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
          } ${!selected ? 'text-gray-500' : ''}`}
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
      {isOpen && options.length > 0 && (
        <>
          {/* 옵션 리스트 */}
          <div
            className={`absolute top-full left-0 z-20 mt-1 ${className} rounded-lg border border-gray-200 bg-white shadow-lg`}
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
