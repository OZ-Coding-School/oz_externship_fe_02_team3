import { X as XIcon } from 'lucide-react'
import Icon from '../Icon'
import Badge from '../Badge'
import { cn } from '@src/utils/cn'

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
    <Badge
      className={cn(
        'inline-flex max-w-full items-center',
        className ?? 'bg-primary-100 text-primary-800'
      )}
    >
      <span className="max-w-10 truncate sm:max-w-20" title={label}>
        {label}
      </span>
      {onRemove && (
        <button
          type="button"
          aria-label={`${label} 태그 제거`}
          onClick={onRemove}
          className="ml-2 text-xs leading-none hover:opacity-80"
        >
          <Icon
            icon={XIcon}
            className="hover:text-danger-800 h-3 w-3 cursor-pointer"
            strokeWidth={3}
          />
        </button>
      )}
    </Badge>
  )
}
