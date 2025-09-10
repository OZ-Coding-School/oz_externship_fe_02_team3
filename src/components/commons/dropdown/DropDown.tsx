import { ChevronDownIcon, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import { cn } from '@utils/cn'
import DropDownOptionList from './DropDownOptionList'

interface DropDownProps {
  selected?: string
  options?: string[]
  onSelect?: (value: string) => void
  leftIcon?: LucideIcon
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
    <div className={`relative`} ref={dropdownRef}>
      <div
        className={cn(
          'relative flex items-center rounded-lg border border-gray-300 py-[9px]',
          className,
          {
            'cursor-pointer': !disabled,
            'cursor-not-allowed opacity-50': disabled,
          }
        )}
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
          className={cn('pr-4 text-sm', {
            'pl-10': leftIcon,
            'pl-4': !leftIcon,
            'text-gray-500': !selected,
          })}
        >
          {displayText}
        </p>

        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          <Icon
            icon={ChevronDownIcon}
            size="sm"
            className={cn(
              'stroke-gray-400 transition-transform',
              rightIconClassName,
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </div>

      {/* 드롭다운 옵션 리스트 */}
      {isOpen && options.length > 0 && (
        <DropDownOptionList
          className={className}
          options={options}
          onSelect={onSelect}
          selected={selected}
          setIsOpen={setIsOpen}
        />
        // <>
        //   {/* 옵션 리스트 */}
        //   <div
        //     className={cn(
        //       'absolute top-full left-0 z-20 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg',
        //       className
        //     )}
        //   >
        //     {options.map((option) => (
        //       <button
        //         key={option}
        //         onClick={() => handleSelect(option)}
        //         className={cn(
        //           'w-full px-4 py-2 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50',
        //           option === selected && 'bg-primary-50 text-primary-600'
        //         )}
        //       >
        //         {option}
        //       </button>
        //     ))}
        //   </div>
        // </>
      )}
    </div>
  )
}
