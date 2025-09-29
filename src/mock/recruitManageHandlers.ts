import { http, HttpResponse } from 'msw'
import type { JobPost } from '@src/types/jobPosts'
import { jobPosts as baseJobPosts } from '@mock/jobPosts'

const ABS = 'https://ozcoding.site/api/v1/recruitments/me'
const REL = '/api/v1/recruitments/me'

const parseDotDate = (str: string) => {
  const isoish = str.replace(/\./g, '-').replace(/\s+/g, '').replace(/-$/, '')
  const d = new Date(isoish)
  return isNaN(d.getTime()) ? new Date() : d
}

interface LectureDTO {
  title: string
  instructor: string
}

interface RecruitmentMeItem {
  id: number
  uuid: string
  title: string
  img: string | null
  expected_headcount: number
  lectures: LectureDTO[]
  tags: string[]
  close_at: string // ISO
  views_count: number
  bookmarks_count: number
  created_at: string // ISO
  updated_at: string // ISO
}

interface RecruitmentMeResponse {
  count: number
  next: string | null
  previous: string | null
  results: RecruitmentMeItem[]
}

function toDto(p: JobPost): RecruitmentMeItem {
  const lectures: LectureDTO[] = (p.courses ?? []).map((c) => {
    const [title, instructor] = c.split(' - ')
    return {
      title: title?.trim() || c,
      instructor: (instructor ?? 'unknown').trim(),
    }
  })

  const d =
    typeof p.deadline === 'string'
      ? parseDotDate(p.deadline)
      : new Date(p.deadline as Date)
  const closeISO = isNaN(d.getTime())
    ? new Date().toISOString()
    : d.toISOString()

  return {
    id: Number(p.id ?? 0),
    uuid: p.uuid || `me-${p.id ?? 0}`,
    title: p.title ?? '',
    img: p.image || null,
    expected_headcount: Number(p.memberLimit ?? 0),
    lectures,
    tags: p.tags ?? [],
    close_at: closeISO,
    views_count: Number(p.viewCount ?? 0),
    bookmarks_count: Number(p.bookmarkCount ?? 0),
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  }
}

interface OrderKey {
  key: 'views_count' | 'bookmarks_count' | 'created_at'
  dir: 'asc' | 'desc'
}
function parseOrdering(orderingRaw: string | null): OrderKey[] {
  if (!orderingRaw) return [{ key: 'created_at', dir: 'desc' }]
  return orderingRaw
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean)
    .map<OrderKey>((token) => {
      const desc = token.startsWith('-')
      const key = (desc ? token.slice(1) : token) as OrderKey['key']
      if (!['views_count', 'bookmarks_count', 'created_at'].includes(key)) {
        return { key: 'created_at', dir: 'desc' }
      }
      return { key, dir: desc ? 'desc' : 'asc' }
    })
}

function sortDtos(items: RecruitmentMeItem[], orders: OrderKey[]) {
  const arr = [...items]
  arr.sort((a, b) => {
    for (const o of orders) {
      let diff = 0
      if (o.key === 'views_count') diff = a.views_count - b.views_count
      else if (o.key === 'bookmarks_count')
        diff = a.bookmarks_count - b.bookmarks_count
      else if (o.key === 'created_at')
        diff =
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      if (diff !== 0) return o.dir === 'asc' ? diff : -diff
    }
    return 0
  })
  return arr
}

function filterByClosed(items: RecruitmentMeItem[], isClosed: boolean | null) {
  if (isClosed === null) return items
  const now = Date.now()
  return items.filter(
    (it) => new Date(it.close_at).getTime() < now === isClosed
  )
}

function handleMe({ request }: { request: Request }) {
  const url = new URL(request.url)
  const isClosedParam = url.searchParams.get('is_closed')
  const orderingParam = url.searchParams.get('ordering')
  const page = Number(url.searchParams.get('page') || 1)
  const size = Number(url.searchParams.get('size') || 10)

  const allDtos = [...baseJobPosts].map(toDto)

  const isClosed =
    isClosedParam === null
      ? null
      : isClosedParam === 'true' || isClosedParam === 'True'
  const filtered = filterByClosed(allDtos, isClosed)

  const orders = parseOrdering(orderingParam)
  const sorted = sortDtos(filtered, orders)

  const total = sorted.length
  const start = (page - 1) * size
  const end = start + size
  const pageItems = sorted.slice(start, end)

  const makePageUrl = (p: number) => {
    const q = new URLSearchParams(url.searchParams)
    q.set('page', String(p))
    return `${url.origin}${url.pathname}?${q.toString()}`
  }

  const body: RecruitmentMeResponse = {
    count: total,
    next: end < total ? makePageUrl(page + 1) : null,
    previous: start > 0 ? makePageUrl(Math.max(1, page - 1)) : null,
    results: pageItems,
  }

  return HttpResponse.json(body, { status: 200 })
}

export const recruitManageHandlers = [
  http.get(REL, handleMe),
  http.get(ABS, handleMe),
]
