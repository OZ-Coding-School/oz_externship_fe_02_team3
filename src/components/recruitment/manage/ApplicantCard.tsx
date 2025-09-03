import Badge from '@src/components/Badge'
import Avatar from '../common/Avatar'
import { Calendar } from 'lucide-react'
import InfoRow from './InfoRow'
import { formatDate } from '@src/utils/date'
import StatusBadge from '@src/components/StatusBadge'

export type ApplicantStatus = 'pending' | 'approved' | 'rejected'


export interface Applicant {
  id: string | number // 상세 모달 API 호출용으로 필요
  name: string
  gender: '남성' | '여성'
  avatarUrl?: string
  appliedAt: string
  availability: string
  hasExp: boolean
  status: ApplicantStatus
}

interface Props {
  data: Applicant
  onClick?: (applicant: Applicant) => void
}

export default function ApplicantCard({ data, onClick }: Props) {
  const {
    // id, // 현재안쓰임
    name,
    gender,
    avatarUrl,
    appliedAt,
    availability,
    hasExp,
    status,
  } = data

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(data)}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(data)}
      className="group relative grid min-h-[204px] w-full cursor-pointer grid-cols-[48px_1fr] grid-rows-[auto_1fr] gap-x-3 gap-y-5 rounded-md bg-gray-100 p-3 shadow"
    >
      <div className="row-span-2 flex items-start pl-0.5">
        <Avatar src={avatarUrl} alt={name} size="lg" />
      </div>

      <div className="col-start-2 flex min-w-0 items-start justify-between">
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold text-gray-900">{name}</p>
          {gender && <p className="text-sm text-gray-500">{gender}</p>}
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="col-start-2 flex flex-col justify-between gap-2 overflow-hidden">
        <InfoRow
          label="지원 일시"
          value={formatDate(appliedAt)}
          icon={Calendar}
          direction="row"
        />
        <InfoRow label="가능한 시간대" value={availability} direction="col" />
        <InfoRow
          label="스터디 경험"
          direction="row"
          badge={
            <Badge
              badgeTitle={hasExp ? '경험 있음' : '경험 없음'}
              sideClass={
                hasExp
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-200 text-gray-600'
              }
            />
          }
        />
      </div>
    </article>
  )
}
