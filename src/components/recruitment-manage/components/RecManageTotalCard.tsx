import {
  FileText as FileTextIcon,
  Megaphone as MegaphoneIcon,
  Clock3 as Clock3Icon,
} from 'lucide-react'
import NotificationBadge from '../common/NotificationBadge'

export default function RecManageTotalCard() {
  return (
    <div className="flex gap-[24px]">
      <NotificationBadge
        Icon={FileTextIcon}
        count={4}
        title={'전체'}
        bgColor="bg-gray-100"
        iconColor="#4B5563"
      />
      <NotificationBadge
        Icon={MegaphoneIcon}
        count={2}
        title={'모집중'}
        bgColor="bg-green-100"
        iconColor="#16A34A"
      />
      <NotificationBadge
        Icon={Clock3Icon}
        count={1}
        title={'마감됨'}
        bgColor="bg-red-100"
        iconColor="#DC2626"
      />
    </div>
  )
}
