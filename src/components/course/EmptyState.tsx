import Icon from '@components/Icon'
import { EMPTY_STATE_ICONS } from '@src/constants/ui'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  iconType?: keyof typeof EMPTY_STATE_ICONS
  customIcon?: LucideIcon
  iconClassName?: string
}

export function EmptyState({
  title = '검색 결과가 없습니다.',
  description = '다른 검색어나 필터를 시도해보세요.',
  iconType = 'SEARCH_RESULTS',
  customIcon,
  iconClassName = 'stroke-gray-400',
}: EmptyStateProps) {
  const IconComponent = customIcon || EMPTY_STATE_ICONS[iconType]

  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <Icon
            icon={IconComponent}
            size="lg"
            className={`h-16 w-16 ${iconClassName}`}
          />
        </div>
        <h3 className="text-lg font-medium text-gray-500">{title}</h3>
        <p className="mt-2 text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}
