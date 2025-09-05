import { cn } from '@src/utils/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  children: ReactNode
  className?: string
  isLoading?: boolean
}

export function ActionButton({
  variant = 'secondary',
  size = 'medium',
  children,
  className,
  disabled,
  isLoading = false,
  ...props
}: ActionButtonProps) {
  const baseClasses =
    'cursor-pointer font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed'

  const variantClasses = {
    primary:
      'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 disabled:bg-gray-300',
    secondary:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500 disabled:bg-gray-100 disabled:text-gray-400',
    ghost:
      'text-gray-700 hover:bg-gray-50 focus:ring-gray-500 disabled:text-gray-400',
  }

  const sizeClasses = {
    small: 'px-4 py-2 text-sm rounded-md',
    medium: 'px-6 py-3 text-sm rounded-lg',
    large: 'px-8 py-4 text-base rounded-lg',
  }

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          로딩중...
        </div>
      ) : (
        children
      )}
    </button>
  )
}
