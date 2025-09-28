import { useCallback, useMemo, useState } from 'react'
import { supa } from '@src/lib/supabase'
import type { Tag } from '@src/types/tag'

interface Notify {
  success: (title: string, content?: string) => void
  error: (title: string, content?: string) => void
}
interface SubmitArgs {
  estimatedFee: number | null
  tags?: Tag[]
  files?: { name: string; url: string }[]
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

const normalizeTags = (list: Tag[] = [], max = 5): Tag[] => {
  const out: Tag[] = []
  const seen = new Set<string>()
  for (const t of list) {
    const id = (t as { id?: number })?.id
    const name = (t.name ?? '').trim()
    if (!name) continue
    const key = Number.isFinite(id as number)
      ? `id:${id}`
      : `name:${name.toLowerCase()}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ id: id as number, name })
    if (out.length >= max) break
  }
  return out
}

const resolveTagIdsByName = async (list: Tag[]): Promise<number[]> => {
  const names = Array.from(
    new Set(list.map((t) => (t.name ?? '').trim()).filter(Boolean))
  )
  if (names.length === 0) return []

  const { data: found, error: sErr } = await supa
    .from('tags')
    .select('id,name')
    .in('name', names)
  if (sErr) throw sErr

  const byName = new Map<string, number>(
    (found ?? []).map((r) => [r.name, r.id])
  )
  const toCreate = names.filter((n) => !byName.has(n))

  if (toCreate.length) {
    const { data: created, error: iErr } = await supa
      .from('tags')
      .insert(toCreate.map((n) => ({ name: n })))
      .select('id,name')
    if (iErr) throw iErr
    for (const r of created ?? []) byName.set(r.name, r.id)
  }

  return Array.from(
    new Set(
      names
        .map((n) => Number(byName.get(n)))
        .filter((x): x is number => Number.isFinite(x))
    )
  )
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

        // 1) 태그 정리(+이름 배열)
        const normTags = normalizeTags(tags, 5)
        const tagNames = normTags.map((t) => t.name)

        // 2) 본문(및 리스트용 text[] 태그) 저장
        const payload = {
          uuid: crypto.randomUUID(),
          author_id: Number(import.meta.env.VITE_FAKE_USER_ID ?? '20'),
          title,
          content,
          expected_headcount: expectedHeadcount,
          estimated_fee: estimatedFee ?? 0,
          close_at: deadline ? deadline.toISOString() : null,
          study_group_id: studyGroupId,
          tags: tagNames,
        }

        const { data: rec, error: insErr } = await supa
          .from('recruitments')
          .insert(payload)
          .select('id, uuid')
          .single()
        if (insErr) throw insErr
        const recId = rec.id as number

        // 3) 피벗(recruitment_tags) 갱신
        const tagIds = await resolveTagIdsByName(normTags)
        if (tagIds.length) {
          const { error: rtErr } = await supa
            .from('recruitment_tags')
            .insert(
              tagIds.map((tid) => ({ recruitment_id: recId, tag_id: tid }))
            )
          if (rtErr) throw rtErr
        }

        // 4) 첨부 저장
        if (files.length) {
          const rows = files.map((f) => ({
            recruitment_id: recId,
            file_url: f.url,
            file_name: f.name ?? '첨부파일',
          }))
          const { error: faErr } = await supa
            .from('recruitment_attachments')
            .insert(rows)
          if (faErr) throw faErr
        }

        notify.success('공고 등록 완료', '성공적으로 등록되었어요.')
        onSuccess?.(rec.uuid)
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
