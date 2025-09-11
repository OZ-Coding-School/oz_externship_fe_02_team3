import { buttonClass, type ButtonClassProps } from './buttonClass'
import Icon from '@src/components/commons/Icon'
import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@utils/cn'
type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonClassProps {
  buttonInnerText?: string
  icon?: LucideIcon | SvgComponent
  iconClassName?: string
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  ariaLabel?: string
}

function Button({
  buttonInnerText,
  icon,
  iconClassName,
  size = 'base',
  iconButtonSize = 'md',
  variant = 'primary',
  fontWeight,
  disabled = false,
  iconSize = 'md',
  ariaLabel,
  onClick,
  className,
  ...props
}: ButtonProps) {
  const iconOnly = !!icon && !buttonInnerText

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        buttonClass({
          size: !iconOnly ? size : undefined,
          iconButtonSize: iconOnly ? iconButtonSize : undefined,
          variant,
          fontWeight,
          iconOnly,
        }),
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel || buttonInnerText}
      {...props}
    >
      {icon && <Icon icon={icon} size={iconSize} className={iconClassName} />}
      {buttonInnerText}
    </button>
  )
}

export default Button
