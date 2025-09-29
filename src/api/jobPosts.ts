import { supa } from '@src/lib/supabase'
import type { JobPost, JobPostsResponse } from '@src/types/jobPosts'

const PAGE_SIZE = 10

export type JobPostSort = 'latest' | 'oldest' | 'popular'

interface FetchParams {
  pageParam?: number
  search?: string
  tag?: string
  sort?: JobPostSort
}

interface RecruitmentRow {
  id: number
  uuid: string
  title: string | null
  expected_headcount: number | null
  close_at: string | null
  views_count: number | null
  bookmarks_count: number | null
  created_at: string | null
  tags: string[] | null
  recruitment_images?: { img_url: string }[] | null
}

const fmtDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString('ko-KR') : ''

export async function fetchJobPosts({
  pageParam = 1,
  search,
  tag,
  sort = 'latest',
}: FetchParams): Promise<JobPostsResponse> {
  const from = (pageParam - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let q = supa.from('recruitments').select(
    `
      id, uuid, title, expected_headcount, close_at,
      views_count, bookmarks_count, created_at, tags,
      recruitment_images:recruitment_images ( img_url )
    `,
    { count: 'exact' }
  )

  if (sort === 'latest') {
    q = q.order('created_at', { ascending: false })
  } else if (sort === 'oldest') {
    q = q.order('created_at', { ascending: true })
  } else {
    q = q.order('views_count', { ascending: false })
  }

  if (search && search.trim()) {
    q = q.ilike('title', `%${search.trim()}%`)
  }

  if (tag && tag !== '전체 태그') {
    q = q.contains('tags', [tag])
  }

  q = q.limit(1, { foreignTable: 'recruitment_images' })

  const { data, error, count } = await q.range(from, to)
  if (error) throw error

  const rows = (data ?? []) as RecruitmentRow[]

  const items: JobPost[] = rows.map((r) => ({
    id: r.id,
    uuid: r.uuid,
    title: r.title ?? '',
    viewCount: r.views_count ?? 0,
    bookmarkCount: r.bookmarks_count ?? 0,
    commentCount: 0,
    memberLimit: r.expected_headcount ?? 0,
    deadline: fmtDate(r.close_at),
    courses: [],
    tags: r.tags ?? [],
    image:
      (r.recruitment_images && r.recruitment_images[0]?.img_url) ||
      'https://placehold.co/320x240/e5e7eb/e5e7eb.png',
  }))

  const total = count ?? items.length
  const hasNext = total > to + 1

  return { items, totalCount: total, hasNext }
}
