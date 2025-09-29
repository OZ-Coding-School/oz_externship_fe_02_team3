import type { JobPost } from '@src/types/jobPosts'

export interface EditDraft {
  id: number
  title?: string
  groupName?: string
  capacityName?: string
  deadline?: Date | null
  price?: string
  tags?: string[]
  courses?: string[]
  files?: {
    id: string | number
    name: string
    url: string
    key?: string | number
  }[]
  markdown?: string
  image?: string | null
}

export type JobPostExtra = Partial<{
  groupName: string
  price: number | string
  files: Array<{
    id?: string | number
    name?: string
    url: string
    key?: string | number
  }>
  markdown: string
}>

export type JobPostForEdit = JobPost & JobPostExtra

type FileItem = NonNullable<JobPostExtra['files']>[number]
function isFileItemArray(v: unknown): v is FileItem[] {
  return Array.isArray(v)
}

const parseMaybeDate = (v: unknown): Date | null => {
  if (!v) return null
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v
  if (typeof v === 'string') {
    // '2025. 12. 30.' 같은 포맷도 대비
    const norm = v.replace(/\./g, '-').replace(/\s+/g, '').replace(/-$/, '')
    const d = new Date(norm)
    return isNaN(d.getTime()) ? null : d
  }
  return null
}

export function makeEditDraftFromPost(post: JobPostForEdit): EditDraft {
  const priceRaw =
    typeof post.price === 'number' ? String(post.price) : (post.price ?? '')

  const files: EditDraft['files'] = isFileItemArray(post.files)
    ? post.files.map((f) => ({
        id: String(f.id ?? f.key ?? f.url),
        name: f.name ?? '첨부파일',
        url: f.url,
        key: f.key,
      }))
    : []

  return {
    id: Number(post.id ?? 0),
    title: post.title ?? '',
    groupName: post.groupName,
    capacityName:
      typeof post.memberLimit === 'number' && !Number.isNaN(post.memberLimit)
        ? `${post.memberLimit}명`
        : undefined,
    deadline: parseMaybeDate(post.deadline),
    price: priceRaw,
    tags: post.tags ?? [],
    courses: post.courses ?? [],
    files,
    markdown: post.markdown ?? '',
    image: post.image ?? null,
  }
}
