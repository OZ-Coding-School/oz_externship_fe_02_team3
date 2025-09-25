import {
  FileText as FileTextIcon,
  Megaphone as MegaphoneIcon,
  Clock3 as Clock3Icon,
} from 'lucide-react'
import NotificationBadge from '../common/NotificationBadge'

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
    <div className="flex gap-[24px]">
      <NotificationBadge
        Icon={FileTextIcon}
        count={total}
        title="전체"
        bgColor="bg-gray-100"
        iconColor="#4B5563"
      />
      <NotificationBadge
        Icon={MegaphoneIcon}
        count={open}
        title="모집중"
        bgColor="bg-green-100"
        iconColor="#16A34A"
      />
      <NotificationBadge
        Icon={Clock3Icon}
        count={closed}
        title="마감됨"
        bgColor="bg-red-100"
        iconColor="#DC2626"
      />
    </div>
  )
}
