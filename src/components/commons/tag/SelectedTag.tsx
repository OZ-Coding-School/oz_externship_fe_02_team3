import { X } from 'lucide-react'
import Icon from '../Icon'
import Badge from '../Badge'

interface SelectedTagProps {
  label: string
  onRemove?: () => void
  className?: string
}

export default function SelectedTag({
  label,
  onRemove,
  className,
}: SelectedTagProps) {
  return (
    <Badge className={className ?? 'bg-primary-100 text-primary-800'}>
      {label}
      {onRemove && (
        <button
          type="button"
          aria-label={`${label} 태그 제거`}
          onClick={onRemove}
          className="ml-2 text-xs leading-none hover:opacity-80"
        >
          <Icon
            icon={X}
            className="hover:text-danger-800 h-3 w-3 cursor-pointer"
            strokeWidth={3}
          />
        </button>
      )}
    </Badge>
  )
}
