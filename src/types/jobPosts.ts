export interface JobPost {
  id: number
  title: string
  viewCount: number
  commentCount: number
  memberLimit: number
  deadline: string
  courses: string[]
  tags: string[]
  image: string
}
