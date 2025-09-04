import Badge from '@src/components/Badge'

export type Status = 'approved' | 'pending' | 'rejected'

const STATUS_MAP: Record<Status, { text: string; cls: string }> = {
  approved: { text: '승인됨', cls: 'bg-emerald-100 text-emerald-700' },
  pending: { text: '대기중', cls: 'bg-amber-100 text-amber-700' },
  rejected: { text: '거절됨', cls: 'bg-rose-100 text-rose-700' },
}

export default function StatusBadge({ status }: { status: Status }) {
  const s = STATUS_MAP[status]
  return <Badge badgeTitle={s.text} sideClass={s.cls} />
}
