import { supa } from '@src/lib/supabase'
import type {
  MeParams,
  RecruitmentMeResponse,
  RecruitmentMeItem,
} from './recManage.type'

const ORDER_MAP: Record<
  NonNullable<MeParams['ordering']>,
  { col: string; asc: boolean }
> = {
  '-created_at': { col: 'created_at', asc: false },
  created_at: { col: 'created_at', asc: true },
  '-views_count': { col: 'views_count', asc: false },
  '-bookmarks_count': { col: 'bookmarks_count', asc: false },
}

const DEFAULT_AUTHOR_ID = Number(import.meta.env.VITE_FAKE_USER_ID ?? '1')

export async function fetchMyRecruitments({
  page,
  size = 10,
  ordering = '-created_at',
  is_closed = null,
  baseUrl = '/api/v1/recruitments/me',
  authorId = DEFAULT_AUTHOR_ID,
}: MeParams): Promise<RecruitmentMeResponse> {
  const from = (page - 1) * size
  const to = from + size - 1
  const ord = ORDER_MAP[ordering] ?? ORDER_MAP['-created_at']

  let q = supa
    .from('recruitment_cards_all')
    .select('*', { count: 'exact' })
    .eq('author_id', authorId)
    .order(ord.col, { ascending: ord.asc })
    .range(from, to)

  if (typeof is_closed === 'boolean') q = q.eq('is_closed', is_closed)

  const { data, count, error } = await q
  if (error) throw error

  const total = count ?? 0
  const last = Math.max(1, Math.ceil(total / size))
  const mk = (p: number | null) =>
    p
      ? `${baseUrl}?page=${p}&size=${size}&ordering=${ordering}${
          is_closed !== null ? `&is_closed=${is_closed}` : ''
        }`
      : null

  return {
    count: total,
    next: page < last ? mk(page + 1) : null,
    previous: page > 1 ? mk(page - 1) : null,
    results: (data ?? []) as RecruitmentMeItem[],
  }
}

export async function fetchRecruitmentsCount({
  is_closed,
  authorId = DEFAULT_AUTHOR_ID,
}: {
  is_closed: boolean | null
  authorId?: number
}): Promise<number> {
  let q = supa
    .from('recruitment_cards_all')
    .select('id', { count: 'exact', head: true })
    .eq('author_id', authorId)

  if (is_closed === true) q = q.eq('is_closed', true)
  else if (is_closed === false) q = q.eq('is_closed', false)

  const { count, error } = await q
  if (error) throw error
  return count ?? 0
}

export default { fetchMyRecruitments, fetchRecruitmentsCount }
