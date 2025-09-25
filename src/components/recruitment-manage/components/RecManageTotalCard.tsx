import {
  FileText as FileTextIcon,
  Megaphone as MegaphoneIcon,
  Clock3 as Clock3Icon,
} from 'lucide-react'
import NotificationBadge from '../common/NotificationBadge'
import StatItem from './StatItem'

export default function RecManageTotalCard({
  total,
  open,
  closed,
}: {
  total: number
  open: number
  closed: number
}) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 sm:hidden">
        <StatItem
          value={total}
          label="전체"
          bgColor="bg-gray-500"
          textColor="text-white"
        />
        <StatItem
          value={open}
          label="모집중"
          bgColor="bg-green-500"
          textColor="text-white"
        />
        <StatItem
          value={closed}
          label="마감됨"
          bgColor="bg-red-400"
          textColor="text-white"
        />
      </div>

      <div className="hidden grid-cols-1 gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <NotificationBadge
          Icon={FileTextIcon}
          count={total}
          title="전체"
          bgColor="bg-gray-100"
          iconColor="#4B5563"
          className="h-full"
        />
        <NotificationBadge
          Icon={MegaphoneIcon}
          count={open}
          title="모집중"
          bgColor="bg-green-100"
          iconColor="#16A34A"
          className="h-full"
        />
        <NotificationBadge
          Icon={Clock3Icon}
          count={closed}
          title="마감됨"
          bgColor="bg-red-100"
          iconColor="#DC2626"
          className="h-full"
        />
      </div>
    </div>
  )
}
