import { useCallback, useMemo, useState } from 'react'
import { supa } from '@src/lib/supabase'
import type { Tag } from '@src/types/tag'

interface Notify {
  success: (title: string, content?: string) => void
  error: (title: string, content?: string) => void
}

export interface SubmitFile {
  id?: string
  name: string
  url: string
  key?: string
}
interface SubmitArgs {
  estimatedFee: number | null
  tags?: Tag[]
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

const normalizeTags = (list: Tag[] = [], max = 5): Tag[] => {
  const out: Tag[] = []
  const seen = new Set<string>()
  for (const t of list) {
    const idVal = typeof t.id === 'number' ? t.id : undefined
    const nameVal = (t.name ?? '').trim()
    if (!nameVal) continue
    const key =
      idVal !== undefined ? `id:${idVal}` : `name:${nameVal.toLowerCase()}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ id: idVal as number, name: nameVal })
    if (out.length >= max) break
  }
  return out
}

const resolveTagIdsByName = async (list: Tag[]): Promise<number[]> => {
  const unique = normalizeTags(list)
  const names = unique.map((t) => t.name)
  if (names.length === 0) return []

  // 1) 기존 태그 조회
  const { data: found, error: selErr } = await supa
    .from('tags')
    .select('id,name')
    .in('name', names)
  if (selErr) throw selErr

  const map = new Map<string, number>(
    (found ?? []).map((r) => [r.name, Number(r.id)])
  )

  // 2) 없는 이름들 생성
  const toCreate = names.filter((n) => !map.has(n))
  if (toCreate.length > 0) {
    const { data: created, error: insErr } = await supa
      .from('tags')
      .insert(toCreate.map((n) => ({ name: n })))
      .select('id,name')
    if (insErr) throw insErr
    for (const r of created ?? []) map.set(r.name, Number(r.id))
  }

  // 3) 최종 id 배열
  const ids = names
    .map((n) => map.get(n))
    .filter((v): v is number => typeof v === 'number' && Number.isFinite(v))
  return Array.from(new Set(ids))
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

        // 1) 공고 본문 생성
        const payload = {
          uuid: crypto.randomUUID(),
          author_id: Number(import.meta.env.VITE_FAKE_USER_ID ?? '20'),
          title,
          content,
          expected_headcount: expectedHeadcount,
          estimated_fee: estimatedFee ?? 0,
          close_at: deadline ? deadline.toISOString() : null,
          study_group_id: studyGroupId,
        }

        const { data: rec, error: recErr } = await supa
          .from('recruitments')
          .insert(payload)
          .select('id, uuid')
          .single()
        if (recErr) throw recErr
        const recId = Number(rec.id)

        // 2) 태그 매핑 (이름→id 보정 후 upsert)
        const tagIds = await resolveTagIdsByName(tags)
        if (tagIds.length > 0) {
          const { error: rtErr } = await supa.from('recruitment_tags').upsert(
            tagIds.map((tid) => ({ recruitment_id: recId, tag_id: tid })),
            { onConflict: 'recruitment_id,tag_id', ignoreDuplicates: true }
          )
          if (rtErr) throw rtErr
        }

        // 3) 첨부 파일 저장
        const cleanFiles = (files ?? []).filter((f) => f?.url && f?.name)
        if (cleanFiles.length > 0) {
          const { error: faErr } = await supa
            .from('recruitment_attachments')
            .insert(
              cleanFiles.map((f) => ({
                recruitment_id: recId,
                file_url: f.url,
                file_name: f.name,
              }))
            )
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
