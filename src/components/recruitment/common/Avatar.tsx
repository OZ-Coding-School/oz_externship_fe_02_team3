import Icon from '@src/components/Icon'
import { UserRound } from 'lucide-react'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | number
  rounded?: 'full' | 'md' | 'lg'
}

export default function Avatar({
  src,
  alt = '사용자',
  size = 'md',
  rounded = 'full',
}: AvatarProps) {
  const sizeMap = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  }
  const classes =
    typeof size === 'string' ? sizeMap[size] : `h-[${size}px] w-[${size}px]`

  return src ? (
    <img
      src={src}
      alt={alt}
      className={`${classes} rounded-${rounded} object-cover`}
    />
  ) : (
    <div
      className={`${classes} bg-primary-100 flex items-center justify-center text-gray-600 rounded-${rounded}`}
    >
      <Icon icon={UserRound} size={size} className="stroke-primary-600" />
    </div>
  )
}
