import type {
  ApplicationDetail,
  ApplicationsResponse,
} from '@src/types/applicant'
import axios from 'axios'

export interface UpdateApplicationResponse {
  message: string
  status: 'APPROVED' | 'REJECTED'
}

// 지원자 목록 조회
export async function getApplications(
  recruitmentUuid: string,
  cursor?: string
) {
  const { data } = await axios.get<ApplicationsResponse>(
    `/api/v1/recruitments/${recruitmentUuid}/applications`,
    { params: { cursor } }
  )
  return data
}

// 지원자 상세 조회
export async function getApplicationDetail(applicationId: number) {
  const { data } = await axios.get<ApplicationDetail>(
    `/api/v1/applications/${applicationId}`
  )
  return data
}

// 승인
export async function approveApplication(applicationId: number) {
  const { data } = await axios.post<UpdateApplicationResponse>(
    `/api/v1/applications/${applicationId}/approve`
  )
  return data
}

// 거절
export async function rejectApplication(applicationId: number) {
  const { data } = await axios.post<UpdateApplicationResponse>(
    `/api/v1/applications/${applicationId}/reject`
  )
  return data
}
