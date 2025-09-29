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
  updated_at: string | null
  author_id?: number
  is_closed?: boolean
}

export interface RecruitmentMeResponse {
  count: number
  next: string | null
  previous: string | null
  results: RecruitmentMeItem[]
}

export type OrderingParam =
  | '-created_at'
  | 'created_at'
  | '-views_count'
  | '-bookmarks_count'

export interface MeParams {
  page: number
  size?: number
  ordering?: OrderingParam
  is_closed?: boolean | null
  baseUrl?: string
  authorId?: number
}
