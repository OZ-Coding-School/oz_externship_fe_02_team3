import Icon from '@components/commons/Icon'
import type { LucideIcon } from 'lucide-react'
type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>

interface JobInfoItem {
  icon: LucideIcon | SvgComponent
  label: string
  value: string | number
}

interface BannerInfoListProps {
  items: JobInfoItem[]
}

export function BannerInfoList({ items }: BannerInfoListProps) {
  return (
    <div className="flex flex-wrap space-x-6">
      {items.map((item, index) => (
        <div
          key={`${item.value}-${index}`}
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <Icon icon={item.icon} size={16} />
          {item.label}: {item.value}
        </div>
      ))}
    </div>
  )
}
