import { api } from './api'

export interface LectureDTO {
  title: string
  instructor: string
}
export interface RecruitmentMeItem {
  id: number
  uuid: string
  title: string
  img: string | null
  expected_headcount: number
  lectures: LectureDTO[]
  tags: string[]
  close_at: string
  views_count: number
  bookmarks_count: number
  created_at: string
  updated_at: string
}
export interface RecruitmentMeResponse {
  count: number
  next: string | null
  previous: string | null
  results: RecruitmentMeItem[]
}

export interface MeParams {
  is_closed?: boolean | null
  ordering?: string
  page: number
  size?: number
}

// List 무한스크롤 작동용
export const fetchMyRecruitments = async (
  params: MeParams
): Promise<RecruitmentMeResponse> => {
  const { data } = await api.get('/api/v1/recruitments/me', { params })
  return data
}

// 갯수 카운트용
export const fetchRecruitmentsCount = async (p: {
  is_closed?: boolean | null
}): Promise<number> => {
  const { data } = await api.get('/api/v1/recruitments/me', {
    params: { page: 1, size: 1, is_closed: p.is_closed ?? undefined },
  })
  return data.count as number
}
