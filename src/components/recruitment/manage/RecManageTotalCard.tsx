import {
  FileText as FileTextICON,
  Megaphone as MegaphoneICON,
  Clock3 as Clock3ICON,
} from 'lucide-react'
import NotificationBadge from '../common/NotificationBadge'

const RecManageTotalCard = () => {
  return (
    <div className="flex gap-[24px]">
      <NotificationBadge
        Icon={FileTextICON}
        count={4}
        title={'전체'}
        bgColor="#F3F4F6"
        iconColor="#4B5563"
      />
      <NotificationBadge
        Icon={MegaphoneICON}
        count={2}
        title={'모집중'}
        bgColor="#DCFCE7"
        iconColor="#16A34A"
      />
      <NotificationBadge
        Icon={Clock3ICON}
        count={1}
        title={'마감됨'}
        bgColor="#FEE2E2"
        iconColor="#DC2626"
      />
    </div>
  )
}

export default RecManageTotalCard
