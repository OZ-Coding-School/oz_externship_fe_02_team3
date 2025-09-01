import type { LucideIcon } from 'lucide-react'

// Icon 컴포넌트 정의
interface IconProps {
  icon: LucideIcon
  className?: string
  containerClassName?: string
  fill?: boolean
}

const Icon = ({
  icon: IconComponent,
  className = '',
  containerClassName = 'h-[14px] w-[14.58px]',
  fill = false,
}: IconProps) => {
  return (
    <div className={containerClassName}>
      <IconComponent
        className={`h-full w-full ${className} ${fill ? 'fill-current' : ''}`}
      />
    </div>
  )
}

export default Icon
