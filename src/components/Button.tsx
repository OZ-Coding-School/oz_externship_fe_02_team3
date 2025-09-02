import Icon from '@components/Icon'
import { Send } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ButtonProps {
  buttonInnerText: string
  icon?: LucideIcon // ✅ 선택적 아이콘
  iconClassName?: string
  size?: 'sm' | 'base' | 'lg'
  variant?: 'filled' | 'outline'
  borderColor?: string
  bgColor?: string
  textColor?: string
  disabled?: boolean
  onClick?: () => void
}

const Button = ({
  buttonInnerText,
  icon,
  iconClassName = '',
  size = 'sm',
  variant = 'filled',
  borderColor = 'border-primary-500',
  bgColor = 'bg-primary-500',
  textColor = 'text-gray-700',
  disabled = false,
  onClick,
}: ButtonProps) => {
  // size별 텍스트 사이즈 매핑
  const textSizeStyles = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  }

  const getButtonStyles = () => {
    if (disabled) {
      return {
        background: 'bg-primary-500/50',
        text: 'text-white/50',
        padding: variant === 'outline' ? 'px-4 py-2' : 'px-6 py-2',
        cursor: 'cursor-not-allowed opacity-60',
      }
    }

    return {
      background: bgColor,
      text: variant === 'outline' ? textColor : 'text-white',
      border: variant === 'outline' ? borderColor : '',
      padding: variant === 'outline' ? 'px-4 py-2' : 'px-6 py-2',
      borderWidth: variant === 'outline' ? 'border-2' : '',
      cursor: 'cursor-pointer',
    }
  }

  const buttonStyles = getButtonStyles()
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={` ${buttonStyles.background} ${buttonStyles.text} ${buttonStyles.border} ${buttonStyles.borderWidth} ${buttonStyles.padding} ${buttonStyles.cursor} flex items-center gap-2 rounded-lg text-sm font-medium`}
    >
      {icon && (
        <Icon
          icon={icon}
          size="sm"
          className={`stroke-white ${iconClassName}`}
        />
      )}
      <span className={textSizeStyles[size]}>{buttonInnerText}</span>
    </button>
  )
}
export default Button
