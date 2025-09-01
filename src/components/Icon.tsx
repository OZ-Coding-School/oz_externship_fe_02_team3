import type { LucideIcon } from 'lucide-react'

// Icon 컴포넌트 정의
interface IconProps {
  icon: LucideIcon
  className?: string
  containerClassName?: string
  fill?: boolean
  strokeWidth?: number
  size?: 'xs' | 's' | 'sm' | 'md' | 'lg' | 'xl' | number
}

const Icon = ({
  icon: IconComponent,
  className = '',
  containerClassName,
  fill = false,
  strokeWidth = 2,
  size = 'sm',
}: IconProps) => {
  // 사이즈 매핑
  const sizeClasses = {
    xs: 'h-3 w-3', // 12px
    s: 'h-3.5 w-3.5',
    sm: 'h-4 w-4', // 16px
    md: 'h-5 w-5', // 20px
    lg: 'h-6 w-6', // 24px
    xl: 'h-8 w-8', // 32px
  }
  const defaultContainerClass =
    typeof size === 'string' ? sizeClasses[size] : ``
  return (
    <div className={containerClassName || defaultContainerClass}>
      <IconComponent
        className={`h-full w-full ${className} ${fill ? 'fill-current' : ''}`}
        strokeWidth={strokeWidth}
      />
    </div>
  )
}

export default Icon
