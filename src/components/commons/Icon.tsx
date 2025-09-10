import type { LucideIcon } from 'lucide-react'
import { cn } from '@utils/cn'
type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>

interface IconProps {
  icon: LucideIcon | SvgComponent
  className?: string
  fill?: boolean
  strokeWidth?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
}
const SIZE_MAP: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}
function Icon({
  icon: IconComponent,
  className,
  fill = false,
  strokeWidth = 2,
  size = 'sm',
}: IconProps) {
  // 사이즈 매핑
  const svgSize =
    typeof size === 'number' ? size : (SIZE_MAP[size] ?? SIZE_MAP.sm)
  return (
    <IconComponent
      width={svgSize}
      height={svgSize}
      className={cn(fill ? 'fill-current' : '', className)}
      strokeWidth={strokeWidth}
    />
  )
}

export default Icon
