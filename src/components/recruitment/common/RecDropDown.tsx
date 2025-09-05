import type { LucideIcon } from 'lucide-react'
import Icon from '@src/components/Icon'

interface RecDropDownProps {
  dropdownTitle: string
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  leftIconClassName?: string
  rightIconClassName?: string
  className?: string
  width?: number | string
  height?: number | string
}

export default function RecDropDown({
  dropdownTitle,
  leftIcon,
  rightIcon,
  leftIconClassName = '',
  rightIconClassName = '',
  className = '',
  width,
  height,
}: RecDropDownProps) {
  return (
    <div
      className={`relative flex h-10 w-full items-center rounded-lg border border-gray-300 ${className}`}
      style={{ width, height }}
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
      <p className="truncate pr-8 pl-10 text-sm">{dropdownTitle}</p>
      {rightIcon && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          <Icon
            icon={rightIcon}
            size="sm"
            className={`stroke-gray-400 ${rightIconClassName}`}
          />
        </div>
      )}
    </div>
  )
}
