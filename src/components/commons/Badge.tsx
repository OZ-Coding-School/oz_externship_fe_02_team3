import { cn } from '@utils/cn'
import type { ReactNode } from 'react'
interface BadgeProps {
  children?: ReactNode
  badgeTitle?: string
  className?: string
}
/*
 * Badge 컴포넌트
 * - children을 넣으면 children 표시
 * - badgeTitle만 넣으면 기존 방식대로 표시
 */
function Badge({ children, badgeTitle, className }: BadgeProps) {
  const content = children ?? badgeTitle
  return (
    <span
      className={cn(
        'flex w-fit items-center justify-center rounded px-2 py-1 text-xs',
        className
      )}
    >
      {content}
    </span>
  )
}

export default Badge
