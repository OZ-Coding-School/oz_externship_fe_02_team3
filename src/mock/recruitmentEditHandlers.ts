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

const toISOFromDot = (v: string) => {
  const norm = v.replace(/\./g, '-').replace(/\s+/g, '').replace(/-$/, '')
  const d = new Date(norm)
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString()
}

const toISODate = (v: unknown): string => {
  if (v instanceof Date) {
    return isNaN(v.getTime()) ? new Date().toISOString() : v.toISOString()
  }
  if (typeof v === 'string') return toISOFromDot(v)
  return new Date().toISOString()
}

function extractDeadline(x: unknown): unknown {
  return (x as { deadline?: unknown })?.deadline
}

const toDetail = (p: JobPost): RecruitmentDetailDTO => ({
  id: Number(p.id ?? 0),
  uuid: p.uuid || `me-${p.id ?? 0}`,
  title: p.title ?? '',
  content: '',
  expected_headcount: Number(p.memberLimit ?? 0),
  estimated_fee: 0,
  close_at: toISODate(extractDeadline(p)),
  tags: (p.tags ?? []).map((name, i) => ({ id: i + 1, name })),
  study_lectures: (p.courses ?? []).map((c) => {
    const [title, instructor] = c.split(' - ')
    return {
      title: (title ?? c).trim(),
      instructor: (instructor ?? 'unknown').trim(),
      thumbnail_img_url: null,
      original_price: 0,
      discount_price: 0,
    }
  }),
})

export const recruitmentDB: Map<string, RecruitmentDetailDTO> = new Map(
  (jobPosts ?? []).map((p) => {
    const d = toDetail(p)
    return [d.uuid, d] as const
  })
)
