import { buttonClass, type ButtonClassProps } from './buttonClass'
import Icon from '@components/Icon'
import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonClassProps {
  buttonInnerText?: string
  icon?: LucideIcon
  iconClassName?: string
  iconSize?: 'xs' | 'sm' | 'md' | 'lg'
  ariaLabel?: string
  className?: string
}

function Button({
  buttonInnerText,
  icon,
  className = '',
  iconClassName = '',
  size = 'base',
  variant = 'primary',
  fontWeight = 'medium',
  disabled = false,
  iconSize = 'sm',
  iconOnly = false,
  ariaLabel,
  onClick,
  ...props
}: ButtonProps) {
  const hasIconAndText = icon && !iconOnly && buttonInnerText
  return (
    <button
      type="button"
      disabled={disabled}
      className={buttonClass({
        size,
        variant,
        fontWeight,
        iconOnly,
        className,
      })}
      onClick={onClick}
      aria-label={ariaLabel || buttonInnerText}
      {...props}
    >
      <span className={hasIconAndText ? 'flex items-center gap-2' : undefined}>
        {icon && <Icon icon={icon} size={iconSize} className={iconClassName} />}
        {!iconOnly && buttonInnerText && <span>{buttonInnerText}</span>}
      </span>
    </button>
  )
}

export default Button
