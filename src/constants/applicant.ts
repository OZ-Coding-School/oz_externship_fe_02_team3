import type { ApplicantStatus } from '@src/types/applicant'

export const STATUS_MAP: Record<
  ApplicantStatus,
  { text: string; className: string }
> = {
  approved: { text: '승인됨', className: 'bg-success-100 text-success-800' },
  pending: { text: '대기중', className: 'bg-primary-100 text-primary-700' },
  rejected: { text: '거절됨', className: 'bg-danger-100 text-danger-800' },
}

export const EXP_BADGE = {
  true: { title: '경험 있음', className: 'bg-success-100 text-success-800' },
  false: { title: '경험 없음', className: 'bg-gray-200 text-gray-800' },
} as const

type ExpKey = keyof typeof EXP_BADGE

export function getExpBadge(hasExp: boolean) {
  return EXP_BADGE[String(hasExp) as ExpKey]
}
