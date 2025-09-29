import { supa } from '@src/lib/supabase'

export interface LectureMini {
  title: string
  instructor: string
}
export interface RecruitmentCard {
  id: number
  uuid: string
  title: string
  img: string | null
  expected_headcount: number
  lectures: LectureMini[]
  tags: string[]
  close_at: string
  views_count: number
  bookmarks_count: number
  created_at: string
  updated_at: string | null
}

export interface ListParams {
  page: number // 1-based
  size?: number // default 10
  search?: string
  tag?: string
  ordering?: 'latest' | '-views_count' | '-bookmarks_count'
  baseUrl?: string // next/prev 링크용 (선택)
}

export interface ListResponse {
  count: number
  next: string | null
  previous: string | null
  results: RecruitmentCard[]
}

const ORDER = {
  latest: { col: 'created_at', asc: false },
  '-views_count': { col: 'views_count', asc: false },
  '-bookmarks_count': { col: 'bookmarks_count', asc: false },
} as const

export async function fetchRecruitments({
  page,
  size = 10,
  search,
  tag,
  ordering = 'latest',
  baseUrl = '/api/v1/recruitments',
}: ListParams): Promise<ListResponse> {
  const from = (page - 1) * size
  const to = from + size - 1
  const ord = ORDER[ordering] ?? ORDER.latest

  let q = supa
    .from('recruitment_cards')
    .select('*', { count: 'exact' })
    .order(ord.col, { ascending: ord.asc })
    .range(from, to)

  if (search?.trim()) q = q.ilike('title', `%${search.trim()}%`)
  if (tag?.trim()) q = q.contains('tags', [tag.trim()]) // text[] contains

  const { data, count, error } = await q
  if (error) throw error

  const total = count ?? 0
  const last = Math.max(1, Math.ceil(total / size))
  const mk = (p: number | null) => {
    if (!p) return null
    const u = new URL(baseUrl, 'http://x')
    u.searchParams.set('page', String(p))
    u.searchParams.set('size', String(size))
    if (search) u.searchParams.set('search', search)
    if (tag) u.searchParams.set('tag', tag)
    if (ordering) u.searchParams.set('ordering', ordering)
    return u.pathname + u.search
  }

  return {
    count: total,
    next: page < last ? mk(page + 1) : null,
    previous: page > 1 ? mk(page - 1) : null,
    results: (data ?? []) as RecruitmentCard[],
  }
}
