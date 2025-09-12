import Icon from '@src/components/commons/Icon'
import { EMPTY_STATE_ICONS } from '@src/constants/ui'
import { cn } from '@src/utils/cn'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  iconType?: keyof typeof EMPTY_STATE_ICONS
  customIcon?: LucideIcon
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number //아이콘 크기
  size?: 'sm' | 'md' | 'lg' //EmptyState 전체 크기 프리셋
  iconClassName?: string //아이콘 자체에 추가할 className
  iconContainerClassName?: string // 아이콘 컨테이너 div에 추가할 className 간격, 정렬
  wrapperClassName?: string //최상위 wrapper div에 추가할 className
  titleClassName?: string // 제목 텍스트에 추가할 className
  descClassName?: string // 설명 텍스트에 추가할 className
}

export function EmptyState({
  title = '검색 결과가 없습니다.',
  description = '다른 검색어나 필터를 시도해보세요.',
  iconType = 'SEARCH_RESULTS',
  customIcon,
  iconSize = 'lg',
  size = 'lg',
  iconClassName = 'stroke-gray-400',
  iconContainerClassName = '',
  wrapperClassName = '',
  titleClassName = '',
  descClassName = '',
}: EmptyStateProps) {
  const IconComponent = customIcon || EMPTY_STATE_ICONS[iconType]
  // props.size(sm | md | lg)에 따라 EmptyState의 레이아웃과 폰트 스타일을 일관되게 적용하기 위해 사용
  const SIZES = {
    sm: { wrapper: 'py-0', title: 'text-md font-semibold', desc: 'text-md' },
    md: { wrapper: 'py-10', title: 'text-lg font-bold', desc: 'text-lg' },
    lg: {
      wrapper: 'py-20',
      title: 'text-xl font-bold',
      desc: 'text-lg',
    },
  } as const

  const sizeStyles = SIZES[size] ?? SIZES.lg //지정 안 됐거나 유효하지 않은 값이면 lg를 기본값으로 사용

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        sizeStyles.wrapper,
        wrapperClassName
      )}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className={cn('flex justify-center', iconContainerClassName)}>
          <Icon
            icon={IconComponent}
            size={iconSize}
            className={iconClassName}
          />
        </div>
        <h4
          className={cn(
            'pb-2 font-semibold text-gray-900',
            sizeStyles.title,
            titleClassName
          )}
        >
          {title}
        </h4>
        <p className={cn('text-gray-500', sizeStyles.desc, descClassName)}>
          {description}
        </p>
      </div>
    </div>
  )
}
