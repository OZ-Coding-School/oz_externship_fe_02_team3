import type { Tag } from '@src/types/tag'
import axios from 'axios'

export async function fetchTags(params: {
  search: string
  page: number
  size: number
}) {
  const res = await axios.get<{ results: Tag[]; count: number }>(
    '/api/v1/recruitments/tags', // 나중에 basurl 사용하면 바꾸기
    {
      params,
    }
  )
  return res.data
}

export async function createTag(name: string) {
  const res = await axios.post<Tag>('/api/v1/recruitments/tags', { name })
  return res.data
}
