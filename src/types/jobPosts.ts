export interface JobPost {
  id: number
  title: string
  viewCount: number
  commentCount: number
  bookmarkCount?: number
  memberLimit: number
  deadline: string
  courses: string[]
  tags: string[]
  image: string
}

export interface JobPostsResponse {
  items: JobPost[]
  hasNext: boolean
  totalCount: number
}

export interface FetchJobPostsParams {
  pageParam?: number
  size?: number
}
