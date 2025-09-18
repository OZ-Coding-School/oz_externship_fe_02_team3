import { http, HttpResponse } from 'msw'
import type { Tag } from '@src/types/tag'

// 간단 인메모리
let seq = 100
const tagsDb: Tag[] = [
  { id: 1, name: 'Python' },
  { id: 2, name: 'React' },
  { id: 3, name: 'TypeScript' },
  { id: 4, name: 'Spring' },
  { id: 5, name: 'Django' },
  { id: 6, name: 'Vue.js' },
  { id: 7, name: 'Angular' },
  { id: 8, name: 'Node.js' },
  { id: 9, name: 'Express' },
  { id: 10, name: 'MongoDB' },
  { id: 11, name: 'SQL' },
  { id: 12, name: 'Java' },
  { id: 13, name: 'C++' },
  { id: 14, name: 'C#' },
  { id: 15, name: 'Go' },
  { id: 16, name: 'Rust' },
  { id: 17, name: 'Kotlin' },
  { id: 18, name: 'Swift' },
  { id: 19, name: 'Machine Learning' },
  { id: 20, name: 'Data Science' },
  { id: 21, name: 'AI' },
  { id: 22, name: 'Docker' },
  { id: 23, name: 'Kubernetes' },
  { id: 24, name: 'AWS' },
  { id: 25, name: 'Azure' },
  { id: 26, name: 'GCP' },
  { id: 27, name: 'Front-end' },
  { id: 28, name: 'Back-end' },
  { id: 29, name: 'Full-stack' },
  { id: 30, name: 'iOS' },
  { id: 31, name: 'Android' },
  { id: 32, name: '초보자환영' },
  { id: 33, name: '주말스터디' },
  { id: 34, name: '온라인' },
  { id: 35, name: '오프라인' },
  { id: 36, name: '스터디' },
  { id: 37, name: '프로젝트' },
  { id: 38, name: '디자인' },
  { id: 39, name: 'UX/UI' },
  { id: 40, name: 'Figma' },
  { id: 41, name: 'Photoshop' },
  { id: 42, name: 'Illustrator' },
  { id: 43, name: 'HTML' },
  { id: 44, name: 'CSS' },
  { id: 45, name: 'JavaScript' },
  { id: 46, name: 'Git' },
  { id: 47, name: 'Scrum' },
  { id: 48, name: 'Agile' },
  { id: 49, name: 'Jira' },
  { id: 50, name: '피그마' },
]

const compareByName = (a: Tag, b: Tag) => a.name.localeCompare(b.name, 'ko')

const paginate = <T>(arr: T[], page: number, size: number) => {
  const start = (page - 1) * size
  return arr.slice(start, start + size)
}

// 검색 + 페이지네이션
export const tagHandlers = [
  http.get('/api/v1/recruitments/tags', ({ request }) => {
    const url = new URL(request.url)
    const search = (url.searchParams.get('search') || '').trim().toLowerCase()
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const size = parseInt(url.searchParams.get('size') || '10', 10)

    const filtered = tagsDb
      .filter((t) => t.name.toLowerCase().includes(search))
      .sort(compareByName)

    const results = paginate(filtered, page, size)
    const body = { results, count: filtered.length }

    return HttpResponse.json(body, { status: 200 })
  }),

  // 새 태그 등록 (중복시 409)
  http.post('/api/v1/recruitments/tags', async ({ request }) => {
    const body = await request.json().catch(() => ({}) as any)
    const name = (body?.name ?? '').trim()
    if (!name) {
      return HttpResponse.json({ detail: 'name is required' }, { status: 400 })
    }

    const exists = tagsDb.some(
      (t) => t.name.toLowerCase() === name.toLowerCase()
    )
    if (exists) {
      return HttpResponse.json(
        { detail: 'Tag already exists' },
        { status: 409 }
      )
    }

    const tag: Tag = { id: ++seq, name }
    tagsDb.unshift(tag) // 최신 우선
    return HttpResponse.json(tag, { status: 201 })
  }),
]
