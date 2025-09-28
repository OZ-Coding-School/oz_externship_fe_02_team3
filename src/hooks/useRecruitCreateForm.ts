import { useCallback, useMemo, useState } from 'react'
import { supa } from '@src/lib/supabase'

interface Notify {
  success: (title: string, content?: string) => void
  error: (title: string, content?: string) => void
}

interface SubmitTag {
  id?: number | string | null
  name: string
}
interface SubmitFile {
  url: string
  name: string
  id?: string
  key?: string
}

interface SubmitArgs {
  estimatedFee: number | null
  tags?: SubmitTag[]
  files?: SubmitFile[]
}

interface Options {
  notify: Notify
  onSuccess?: (uuid?: string) => void
}

interface ErrWithMsg {
  message?: unknown
  error_description?: unknown
}
const extractErrorMessage = (e: unknown): string => {
  if (typeof e === 'string') return e
  if (typeof e === 'object' && e !== null) {
    const { message, error_description } = e as ErrWithMsg
    if (typeof message === 'string') return message
    if (typeof error_description === 'string') return error_description
  }
  return '알 수 없는 오류가 발생했어요.'
}

const normalizeTags = (tags: SubmitTag[] = []) => {
  const ids: number[] = []
  const names: string[] = []
  for (const t of tags) {
    const name = String(t.name ?? '').trim()
    const num = t.id === 0 || t.id ? Number(t.id) : NaN
    if (Number.isFinite(num)) ids.push(num)
    if (name) names.push(name)
  }
  return { ids, names }
}

const ensureTagIds = async (rawTags: SubmitTag[]): Promise<number[]> => {
  const { ids: incomingIds, names } = normalizeTags(rawTags)
  const nameSet = Array.from(new Set(names))
  let existing: { id: number; name: string }[] = []

  if (nameSet.length > 0) {
    const { data, error } = await supa
      .from('tags')
      .select('id, name')
      .in('name', nameSet)
    if (error) throw error
    existing = data ?? []
  }

  const existingNameSet = new Set(existing.map((r) => r.name))
  const toCreateNames = nameSet.filter((n) => !existingNameSet.has(n))
  let created: { id: number; name: string }[] = []
  if (toCreateNames.length > 0) {
    const { data: createdRows, error: insErr } = await supa
      .from('tags')
      .insert(toCreateNames.map((name) => ({ name })))
      .select('id, name')
    if (insErr) throw insErr
    created = createdRows ?? []
  }

  const allIds = [
    ...incomingIds,
    ...existing.map((r) => Number(r.id)),
    ...created.map((r) => Number(r.id)),
  ].filter((n, i, arr) => Number.isFinite(n) && arr.indexOf(n) === i)

  return allIds
}

export function useRecruitCreateForm({ notify, onSuccess }: Options) {
  const [title, setTitle] = useState('')
  const [studyGroupId, setStudyGroupId] = useState<number | null>(null)
  const [deadline, setDeadline] = useState<Date | null>(null)
  const [expectedHeadcount, setExpectedHeadcount] = useState<number | null>(
    null
  )
  const [content, setContent] = useState('')

  const canSubmit = useMemo(
    () =>
      Boolean(
        title.trim() &&
          studyGroupId &&
          deadline &&
          expectedHeadcount &&
          content.trim()
      ),
    [title, studyGroupId, deadline, expectedHeadcount, content]
  )

  const onTitleChange = useCallback((v: string) => setTitle(v), [])
  const onStudyGroupIdChange = useCallback(
    (id: number | null) => setStudyGroupId(id),
    []
  )
  const onDeadlineChange = useCallback((d: Date | null) => setDeadline(d), [])
  const onExpectedHeadcountChange = useCallback(
    (n: number | null) => setExpectedHeadcount(n),
    []
  )
  const onContentChange = useCallback((v: string) => setContent(v), [])

  const handleSubmit = useCallback(
    async ({ estimatedFee, tags = [], files = [] }: SubmitArgs) => {
      try {
        if (!canSubmit) {
          notify.error(
            '입력값을 확인해주세요',
            '필수 항목을 모두 입력해주세요.'
          )
          return
        }

        // 1) 본문 저장
        const payload = {
          uuid: crypto.randomUUID(),
          author_id: Number(import.meta.env.VITE_FAKE_USER_ID ?? '20'),
          title,
          content,
          expected_headcount: expectedHeadcount,
          estimated_fee: estimatedFee ?? 0,
          close_at: deadline ? deadline.toISOString() : null,
          study_group_id: studyGroupId,
          tags: Array.from(
            new Set(tags.map((t) => String(t.name ?? '').trim()))
          ).filter(Boolean),
        }

        const { data: rec, error: recErr } = await supa
          .from('recruitments')
          .insert(payload)
          .select('id, uuid')
          .single()
        if (recErr) throw recErr

        const recruitmentId = Number(rec.id)
        const recruitmentUuid = String(rec.uuid)

        // 2) 태그 연결 (없으면 생성 → id 전부 확보 후 조인 저장)
        const tagIds = await ensureTagIds(tags)
        if (tagIds.length > 0) {
          const linkRows = tagIds.map((tag_id) => ({
            recruitment_id: recruitmentId,
            tag_id,
          }))
          const { error: linkErr } = await supa
            .from('recruitment_tags')
            .insert(linkRows)
          if (linkErr) throw linkErr
        }

        // 3) 첨부파일 메타 저장 (file_url UNIQUE)
        if (files.length > 0) {
          const dedup = Array.from(
            new Map(files.map((f) => [f.url, f])).values()
          )
          const rows = dedup.map((f) => ({
            recruitment_id: recruitmentId,
            file_url: f.url,
            file_name: f.name,
          }))
          const { error: fileErr } = await supa
            .from('recruitment_attachments')
            .insert(rows)
          if (fileErr) throw fileErr
        }

        notify.success('공고 등록 완료', '성공적으로 등록되었어요.')
        onSuccess?.(recruitmentUuid)
      } catch (e: unknown) {
        notify.error('공고 등록 실패', extractErrorMessage(e))
      }
    },
    [
      canSubmit,
      title,
      content,
      expectedHeadcount,
      deadline,
      studyGroupId,
      notify,
      onSuccess,
    ]
  )

  return {
    canSubmit,
    onTitleChange,
    onStudyGroupIdChange,
    onDeadlineChange,
    onExpectedHeadcountChange,
    onContentChange,
    handleSubmit,
  }
}

export type UseRecruitCreateFormReturn = ReturnType<typeof useRecruitCreateForm>
