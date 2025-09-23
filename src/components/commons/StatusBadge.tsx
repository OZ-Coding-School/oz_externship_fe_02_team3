import Badge from '@src/components/commons/Badge'
import { STATUS_MAP } from '@src/constants/applicant'
import { type ApplicantStatus } from '@src/types/applicant'

export default function StatusBadge({ status }: { status: ApplicantStatus }) {
  const parsedStatus = STATUS_MAP[status]
  return (
    <Badge badgeTitle={parsedStatus.text} className={parsedStatus.className} />
  )
}
