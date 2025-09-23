import StatusBadge from '@src/components/commons/StatusBadge'
import Avatar from '../common/Avatar'
import type { ApplicantDetail } from '@src/types/applicant'

export default function ApplicantProfile({ data }: { data: ApplicantDetail }) {
  const { avatarUrl, name, gender, status, appliedAt } = data
  return (
    <article className="w-full rounded-xl bg-gray-50 px-3 py-4">
      <div className="grid grid-cols-[48px_2fr_6fr] gap-2">
        <div className="flex items-center justify-center">
          <Avatar size="lg" src={avatarUrl} alt={name} />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h4 className="font-bold"> {name} </h4>
          <p className="text-sm text-gray-600"> {gender} </p>
        </div>
        <div className="flex flex-col items-end justify-center gap-1">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600"> 지원 상태</p>
            <StatusBadge status={status} />
          </div>

          <p className="text-sm text-gray-600"> 지원 일시</p>
          <p className="text-sm font-bold">{appliedAt}</p>
        </div>
      </div>
    </article>
  )
}
