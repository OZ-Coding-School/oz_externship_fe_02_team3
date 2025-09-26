import type { LucideIcon } from 'lucide-react'

interface BadgeProps {
  Icon: LucideIcon
  count: number
  title: string
  bgColor: string
  iconColor: string
  className?: string
}

export default function NotificationBadge({
  Icon,
  count,
  title,
  bgColor,
  iconColor,
  className = '',
}: BadgeProps) {
  return (
    <div
      className={[
        'flex w-full items-center gap-4 rounded-lg bg-white p-4 ring-1 ring-gray-200',
        'sm:p-5',
        className,
      ].join(' ')}
    >
      <div
        className={`grid h-12 w-12 place-items-center rounded-lg ${bgColor}`}
      >
        <Icon className="h-6 w-6 shrink-0" strokeWidth={2} color={iconColor} />
      </div>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-xl font-bold text-gray-900 sm:text-[22px]">
          {count}
        </p>
        <p className="truncate text-sm font-normal text-gray-600">{title}</p>
      </div>
    </div>
  )
}
