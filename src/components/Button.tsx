import Icon from '@components/Icon'
import { type LucideIcon } from 'lucide-react'

interface ButtonProps {
  buttonInnerText?: string
  icon?: LucideIcon
  className?: string
  iconClassName?: string
  size?: 'sm' | 'base' | 'lg'
  variant?: 'filled' | 'outline' | 'text' | 'ghost'
  borderColor?: string
  bgColor?: string
  textColor?: string
  disabled?: boolean
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  iconSize?: 'xs' | 'sm' | 'md' | 'lg'
  iconOnly?: boolean
  ariaLabel?: string
  onClick?: () => void
}

const Button = ({
  buttonInnerText,
  icon,
  className = '',
  iconClassName = '',
  size = 'sm',
  variant = 'filled',
  borderColor = 'border-primary-500',
  bgColor = 'bg-primary-500',
  textColor = 'text-gray-700',
  fontWeight = 'medium',
  disabled = false,
  iconSize = 'sm',
  iconOnly = false,
  ariaLabel,
  onClick,
}: ButtonProps) => {
  // size별 텍스트 사이즈 매핑
  const sizeMap = { sm: 'text-sm', base: 'text-base', lg: 'text-lg' }
  // fontWeight 매핑
  const weightMap = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  const baseStyles = `flex items-center gap-2 rounded-lg transition-colors duration-200 ${weightMap[fontWeight]}`
  const padding = iconOnly
    ? 'p-2'
    : variant === 'outline' || icon
      ? 'px-4 py-2'
      : 'px-6 py-2'

  const variantStyles =
    variant === 'outline'
      ? `border-1 ${borderColor} ${textColor} ${!iconOnly ? 'hover:bg-primary-50 active:bg-primary-100' : ''}`
      : variant === 'ghost'
        ? `${textColor} ${!iconOnly ? 'hover:bg-gray-100 active:bg-gray-200' : ''}`
        : `${bgColor} text-white ${!iconOnly ? 'hover:bg-primary-600 active:bg-primary-700' : ''}`

  const disabledStyles = disabled
    ? 'opacity-60 cursor-not-allowed'
    : 'cursor-pointer'

  return (
    <button
      type="button"
      disabled={disabled}
      className={`${baseStyles} ${padding} ${variantStyles} ${disabledStyles} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel || buttonInnerText}
    >
      {icon && (
        <Icon
          icon={icon}
          size={iconSize}
          className={
            iconClassName ||
            (variant === 'ghost' ? 'stroke-gray-400' : 'stroke-white')
          }
        />
      )}
      {!iconOnly && buttonInnerText && (
        <span className={sizeMap[size]}>{buttonInnerText}</span>
      )}
    </button>
  )
}
export default Button
