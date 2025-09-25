export type ApplicantStatus = 'pending' | 'approved' | 'rejected'

export interface Applicant {
  id: number
  name: string
  gender: '남성' | '여성'
  avatarUrl?: string
  appliedAt: string
  availability: string
  hasExp: boolean
  status: ApplicantStatus
}

export interface ApplicantDetail extends Applicant {
  intro: string
  motive: string
  goal: string
  expDetail: string
}
