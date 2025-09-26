import type { JobPost } from '@src/types/jobPosts'
import { jobPosts } from '@mock/jobPosts'

export interface RecruitmentDetailDTO {
  id: number
  uuid: string
  title: string
  content: string
  expected_headcount: number
  estimated_fee: number
  close_at: string // ISO
  tags: { id: number; name: string }[]
  study_lectures: Array<{
    title: string
    instructor: string
    thumbnail_img_url: string | null
    original_price: number
    discount_price: number
  }>
}

const toDetail = (p: JobPost): RecruitmentDetailDTO => ({
  id: p.id,
  uuid: `me-${p.id}`,
  title: p.title,
  content: '',
  expected_headcount: p.memberLimit,
  estimated_fee: 0,
  close_at:
    typeof p.deadline === 'string'
      ? new Date(p.deadline.replace(/\./g, '-')).toISOString()
      : new Date(p.deadline as Date).toISOString(),
  tags: (p.tags ?? []).map((name, i) => ({ id: i + 1, name })),
  study_lectures: (p.courses ?? []).map((c) => {
    const [title, instructor] = c.split(' - ')
    return {
      title: title?.trim() || c,
      instructor: (instructor ?? 'unknown').trim(),
      thumbnail_img_url: null,
      original_price: 0,
      discount_price: 0,
    }
  }),
})

export const recruitmentDB: Map<string, RecruitmentDetailDTO> = new Map(
  jobPosts.map((p) => {
    const d = toDetail(p)
    return [d.uuid, d]
  })
)
