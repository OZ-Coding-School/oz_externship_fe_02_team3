import type { LucideIcon } from 'lucide-react'
import { cn } from '@src/utils/cn'
import { cva } from 'class-variance-authority'

interface Base {
  label: string
  icon?: LucideIcon
  direction?: 'row' | 'col'
}

type InfoRowWithValue = Base & {
  value: string
  badge?: never
}

type InfoRowWithBadge = Base & {
  badge: React.ReactNode
  value?: never
}

export type InfoRowProps = InfoRowWithValue | InfoRowWithBadge

const infoRow = cva('text-sm text-gray-800', {
  variants: {
    direction: {
      row: 'grid grid-cols-[96px_1fr] items-center gap-2',
      col: 'flex flex-col gap-1',
    },
  },
  defaultVariants: {
    direction: 'row',
  },
})

export default function InfoRow({
  label,
  icon: Icon,
  direction = 'row',
  ...rest
}: InfoRowProps) {
  const Label = (
    <span className="flex items-center gap-1 text-sm text-gray-800">
      {Icon && <Icon className="h-4 w-4 text-gray-800" />}
      {label}
    </span>
  )
  const PROP_BADGE = 'badge' as const
  const Content =
    PROP_BADGE in rest ? (
      <div className="min-w-0">{rest.badge}</div>
    ) : (
      <p className="truncate text-sm text-gray-800">{rest.value}</p>
    )

  return (
    <div className={cn(infoRow({ direction }))}>
      {Label}
      {Content}
    </div>
  )
}
