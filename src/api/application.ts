import type {
  ApplicationDetail,
  ApplicationsResponse,
  SubmitApplicationPayload,
  SubmitApplicationResponse,
} from '@src/types/applicant'
import axios from 'axios'
import { api } from './api'

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
  const { data } = await api.get<ApplicationDetail>(
    `/api/v1/applications/${applicationId}`
  )
  return data
}

// 승인
export async function approveApplication(applicationId: number) {
  const { data } = await api.post<UpdateApplicationResponse>(
    `/api/v1/applications/${applicationId}/approve`
  )
  return data
}

// 거절
export async function rejectApplication(applicationId: number) {
  const { data } = await api.post<UpdateApplicationResponse>(
    `/api/v1/applications/${applicationId}/reject`
  )
  return data
}

// 지원서 제출
export async function submitApplication(
  recruitmentId: string,
  payload: SubmitApplicationPayload
) {
  const { data } = await api.post<SubmitApplicationResponse>(
    `/api/v1/recruitments/${recruitmentId}/applications`,
    payload
  )
  return data
}
