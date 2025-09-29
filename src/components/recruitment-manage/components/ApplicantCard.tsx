import Badge from '@components/commons/Badge'
import Avatar from '../common/Avatar'
import { Calendar as CalendarIcon } from 'lucide-react'
import InfoRow from './InfoRow'
import { formatDate } from '@utils/date'
import StatusBadge from '@components/commons/StatusBadge'
import { useCallback, memo } from 'react'
import type { ApplicationsItem, ApplicantStatus } from '@src/types/applicant'
import { getExpBadge } from '@src/constants/applicant'

interface ApplicantCardProps {
  data: ApplicationsItem
  onClick?: (applicant: ApplicationsItem) => void
}

export default memo(function ApplicantCard({
  data,
  onClick,
}: ApplicantCardProps) {
  const {
    applicant,
    applied_at,
    available_time,
    has_study_experience,
    status,
  } = data

  const name = applicant.nickname
  const gender = applicant.gender === 'M' ? '남성' : '여성'
  const avatarUrl = applicant.profile_img_url ?? undefined

  const { title: expTitle, className: badgeClass } =
    getExpBadge(has_study_experience)

  const handleClick = useCallback(() => onClick?.(data), [onClick, data])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick?.(data)
      }
    },
    [onClick, data]
  )

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${name} 지원자 카드 열기`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
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
        <StatusBadge status={status as ApplicantStatus} />
      </div>

      <div className="col-start-2 flex flex-col justify-between gap-2 overflow-hidden">
        <InfoRow
          label="지원 일시"
          value={formatDate(applied_at)}
          icon={CalendarIcon}
          direction="row"
        />
        <InfoRow label="가능한 시간대" value={available_time} direction="col" />
        <InfoRow
          label="스터디 경험"
          direction="row"
          badge={<Badge badgeTitle={expTitle} className={badgeClass} />}
        />
      </div>
    </article>
  )
})
