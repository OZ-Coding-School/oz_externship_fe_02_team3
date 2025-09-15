import type { LucideIcon } from 'lucide-react'

interface BadgeProps {
  Icon: LucideIcon
  count: number
  title: string
  bgColor: string
  iconColor: string
}

export default function NotificationBadge({
  Icon,
  count,
  title,
  bgColor,
  iconColor,
}: BadgeProps) {
  return (
    <div className="flex h-[102px] w-[286px] items-center gap-4 rounded-lg bg-white p-4 shadow-sm ring-1 ring-[#E5E7EB]">
      <div
        className={`grid h-12 w-12 place-items-center rounded-lg ${bgColor}`}
      >
        <Icon className="h-6 w-6 shrink-0" strokeWidth={2} color={iconColor} />
      </div>
      <div className="flex flex-col leading-tight">
        <p className="text-[22px] font-bold text-gray-900">{count}</p>
        <p className="text-sm font-normal text-gray-600">{title}</p>
      </div>
    </div>
  )
}
