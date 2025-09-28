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
    id: post.id,
    title: post.title,
    groupName: post.groupName,
    capacityName: post.memberLimit ? `${post.memberLimit}명` : undefined,
    deadline: post.deadline ? new Date(post.deadline) : null,
    price: priceRaw,
    tags: post.tags ?? [],
    courses: post.courses ?? [],
    files,
    markdown: post.markdown ?? '',
    image: post.image ?? null,
  }
}
