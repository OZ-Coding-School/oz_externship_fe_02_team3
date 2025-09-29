import { supa } from '@src/lib/supabase'
import type { JobPost, JobPostsResponse } from '@src/types/jobPosts'
import { extractFirstImageFromMarkdown } from '@src/utils/extractFirstImage'

export type JobPostSort = 'latest' | 'oldest' | 'popular'
const PAGE_SIZE = 10

interface FetchParams {
  pageParam?: number
  search?: string
  tag?: string
  sort?: JobPostSort
}

type Maybe<T> = T | null | undefined
const toArr = <T>(v: Maybe<T | T[]>): T[] =>
  v == null ? [] : Array.isArray(v) ? v : [v]

interface CrawledLectureRow {
  title: string | null
  instructor: string | null
}
interface StudyLectureRow {
  crawled_lectures?: CrawledLectureRow | CrawledLectureRow[] | null
}
interface StudyGroupRow {
  id: number
  study_lectures?: StudyLectureRow | StudyLectureRow[] | null
}

interface RecruitmentRow {
  id: number
  uuid: string
  title: string | null
  content: string | null
  expected_headcount: number | null
  close_at: string | null
  views_count: number | null
  bookmarks_count: number | null
  created_at: string | null
  tags: string[] | null
  recruitment_images?: { img_url: string }[] | null
  study_groups?: StudyGroupRow | StudyGroupRow[] | null
}

const fmtDate = (iso?: string | null) => {
  if (!iso) return ''
  const d = new Date(iso)
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('ko-KR')
}

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
      id, uuid, title, content,
      expected_headcount, close_at,
      views_count, bookmarks_count, created_at, tags,
      recruitment_images:recruitment_images ( img_url ),
      study_groups:study_groups (
        id,
        study_lectures:study_lectures (
          crawled_lectures:crawled_lectures ( title, instructor )
        )
      )
    `,
    { count: 'exact' }
  )

  if (sort === 'latest') q = q.order('created_at', { ascending: false })
  else if (sort === 'oldest') q = q.order('created_at', { ascending: true })
  else q = q.order('views_count', { ascending: false })

  if (search && search.trim()) q = q.ilike('title', `%${search.trim()}%`)
  if (tag && tag !== '전체 태그') q = q.contains('tags', [tag])

  q = q.limit(1, { foreignTable: 'recruitment_images' })
  q = q.limit(5, { foreignTable: 'study_groups.study_lectures' })

  const { data, error, count } = await q.range(from, to)
  if (error) throw error

  const rows = (data ?? []) as RecruitmentRow[]

  const items: JobPost[] = rows.map((r) => {
    const groups = toArr(r.study_groups)
    const lectures = groups.flatMap((g) => toArr(g.study_lectures))
    const crawled = lectures.flatMap((sl) => toArr(sl.crawled_lectures))

    const courses =
      crawled
        .map((cl) =>
          [cl.title ?? '', cl.instructor ?? ''].filter(Boolean).join(' - ')
        )
        .filter((s) => s.length > 0) ?? []

    const fromMd = extractFirstImageFromMarkdown(r.content)
    const fromRel = r.recruitment_images?.[0]?.img_url ?? null
    const image =
      fromMd || fromRel || 'https://placehold.co/320x240/e5e7eb/e5e7eb.png'

    return {
      id: r.id,
      uuid: r.uuid,
      title: r.title ?? '',
      viewCount: r.views_count ?? 0,
      bookmarkCount: r.bookmarks_count ?? 0,
      commentCount: 0,
      memberLimit: r.expected_headcount ?? 0,
      deadline: fmtDate(r.close_at),
      courses,
      tags: r.tags ?? [],
      image,
    }
  })

  const total = count ?? items.length
  return { items, totalCount: total, hasNext: total > to + 1 }
}

export type { FetchParams }
