import type { LucideIcon } from 'lucide-react'

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

  // rest 객체 안에 badge라는 속성 찾아 분기 랜더링
  const Content =
    'badge' in rest ? (
      <div className="min-w-0">{rest.badge}</div>
    ) : (
      <p className="truncate text-sm text-gray-800">{rest.value}</p>
    )
  if (direction === 'col') {
    return (
      <div className="flex flex-col gap-1 text-sm">
        {Label}
        {Content}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-[96px_1fr] items-center gap-2 text-sm">
      {Label}
      {Content}
    </div>
  )
}
