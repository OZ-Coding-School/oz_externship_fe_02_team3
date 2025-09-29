export type ApplicantStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type Gender = 'M' | 'F'

//지원자 목록 조회
export interface ApplicationsItem {
  application_id: number
  applicant: {
    nickname: string
    gender: Gender
    profile_img_url?: string | null
  }
  available_time: string
  has_study_experience: boolean
  status: ApplicantStatus
  applied_at: string
}
export interface ApplicationsResponse {
  next_cursor?: string | null
  results: ApplicationsItem[]
}

// 자원자 상세
export interface ApplicationDetail {
  applicant_info: {
    nickname: string
    gender: Gender | string
    profile_img_url?: string | null
  }
  introduction: string
  motivation: string
  study_goal: string
  available_times: string
  has_study_experience: boolean
  specific_experience: string
  status: ApplicantStatus
  applied_at: string
}

// 제출 관련 타입 정의
export interface SubmitApplicationPayload {
  self_introduction: string
  motivation: string
  objective: string
  available_time: string
  has_study_experience: boolean
  study_experience?: string
}

export interface SubmitApplicationResponse {
  application_id: number
  message: string
}
