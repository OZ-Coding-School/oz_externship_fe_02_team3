import Badge from '@src/components/commons/Badge'

export type Status = 'approved' | 'pending' | 'rejected'

const STATUS_MAP: Record<Status, { text: string; cls: string }> = {
  approved: { text: '승인됨', cls: 'bg-success-100 text-success-800' },
  pending: { text: '대기중', cls: 'bg-primary-100 text-primary-700' },
  rejected: { text: '거절됨', cls: 'bg-danger-100 text-danger-800' },
}

export default function StatusBadge({ status }: { status: Status }) {
  const parsedStatus = STATUS_MAP[status]
  return <Badge badgeTitle={parsedStatus.text} className={parsedStatus.cls} />
}
