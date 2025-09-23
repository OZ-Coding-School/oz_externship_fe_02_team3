import Badge from '@components/commons/Badge'
import Avatar from '../common/Avatar'
import { Calendar as CalendarIcon } from 'lucide-react'
import InfoRow from './InfoRow'
import { formatDate } from '@utils/date'
import StatusBadge from '@components/commons/StatusBadge'
import { useCallback, memo } from 'react'
import type { Applicant } from '@src/types/applicant'
import { getExpBadge } from '@src/constants/applicant'

interface Props {
  data: Applicant
  onClick?: (applicant: Applicant) => void
}

export default memo(function ApplicantCard({ data, onClick }: Props) {
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

  const { title: expTitle, className: badgeClass } = getExpBadge(hasExp)

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
        <StatusBadge status={status} />
      </div>

      <div className="col-start-2 flex flex-col justify-between gap-2 overflow-hidden">
        <InfoRow
          label="지원 일시"
          value={formatDate(appliedAt)}
          icon={CalendarIcon}
          direction="row"
        />
        <InfoRow label="가능한 시간대" value={availability} direction="col" />
        <InfoRow
          label="스터디 경험"
          direction="row"
          badge={<Badge badgeTitle={expTitle} className={badgeClass} />}
        />
      </div>
    </article>
  )
})
