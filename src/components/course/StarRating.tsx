import { Star as StarIcon } from 'lucide-react'
import Icon from '@components/commons/Icon'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  showRating?: boolean
  className?: string
}

export default function StarRating({
  rating,
  size = 'sm',
  showRating = false,
  className = '',
}: StarRatingProps) {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        icon={StarIcon}
        className={
          i < Math.floor(rating)
            ? 'stroke-primary-400 fill-primary-400'
            : 'stroke-primary-400'
        }
        size={size}
        fill={i < Math.floor(rating)}
      />
    ))
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">{renderStars()}</div>
      {showRating && (
        <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
      )}
    </div>
  )
}
