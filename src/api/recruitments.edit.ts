import { api } from './api'

export interface UpdateRecruitmentPayload {
  title?: string
  content?: string
  expected_headcount?: number
  estimated_fee?: number
  close_at?: string
  tags?: string[]
}

export const getRecruitmentDetail = async (uuid: string) => {
  const { data } = await api.get(`/api/v1/recruitments/${uuid}`)
  return data
}

export const patchRecruitment = async (
  uuid: string,
  payload: UpdateRecruitmentPayload
) => {
  const { data } = await api.patch(`/api/v1/recruitments/${uuid}`, payload)
  return data
}
