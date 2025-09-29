import StatusBadge from '@src/components/commons/StatusBadge'
import Avatar from '../common/Avatar'
import type { ApplicationDetail } from '@src/types/applicant'
import { formatDate } from '@utils/date'

export default function ApplicantProfile({
  data,
}: {
  data: ApplicationDetail
}) {
  const { status, applied_at } = data
  const info = data?.applicant_info

  // 응답 이상 시(미존재/누락)
  if (!info) {
    return (
      <article className="w-full rounded-xl bg-gray-50 px-3 py-4">
        <div className="text-sm text-gray-500">
          지원자 기본 정보가 없어요. 잠시 후 다시 시도해주세요.
        </div>
      </article>
    )
  }

  const { profile_img_url, nickname, gender } = info
  const genderLabel = gender === 'M' ? '남성' : gender === 'F' ? '여성' : '기타'

  if (!data?.applicant_info) return null
  return (
    <article className="w-full rounded-xl bg-gray-50 px-3 py-4">
      <div className="grid grid-cols-[48px_2fr_6fr] gap-2">
        <div className="flex items-center justify-center">
          <Avatar size="lg" src={profile_img_url ?? undefined} alt={nickname} />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h4 className="font-bold">{nickname}</h4>
          <p className="text-sm text-gray-600">{genderLabel}</p>
        </div>
        <div className="flex flex-col items-end justify-center gap-1">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">지원 상태</p>
            <StatusBadge status={status} />
          </div>
          <p className="text-sm text-gray-600">지원 일시</p>
          <p className="text-sm font-bold">{formatDate(applied_at)}</p>
        </div>
      </div>
    </article>
  )
}
