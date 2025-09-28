import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useToast } from '@components/commons/toast'
import RecEditHeader from '@src/components/recruitment-edit/RecEditHeader'
import RecEditBasicInfo from '@src/components/recruitment-edit/RecEditBasicInfo'
import RecEditContentSection from '@src/components/recruitment-edit/RecEditContentSection'
import RecEditAdditionalInfo, {
  type PresetFileIn,
} from '@src/components/recruitment-edit/RecEditAdditionalInfo'
import RecEditFooter from '@src/components/recruitment-edit/RecEditFooter'

import {
  RECRUIT_EDIT_TOAST,
  RECRUIT_EDIT_VALIDATION,
} from '@src/constants/receditmessage'
import { parseCapacity, toFinalPrice } from '@src/utils/recEdit'
import type { EditDraft } from '@src/utils/makeEditDraftFromPost'
import { supa } from '@src/lib/supabase'

// ────────────────────── Types
interface RawRec {
  id: number
  uuid: string
  title: string
  content: string | null
  expected_headcount: number | null
  close_at: string | null
  study_group_id: number | null
  estimated_fee: number | null
  study_groups?: { name: string | null } | { name: string | null }[] | null
}
interface FileLike {
  id?: string | number
  name?: string
  url: string
  key?: string | number
}
interface LectureObj {
  id: number
  title: string
  original_price: number | string | null
  discount_price: number | string | null
}
interface DBGroupCourseRow {
  lecture_id: number
  crawled_lectures: LectureObj | null
}
interface PreviewCourse {
  id: number | string
  title: string
  price: number
}
interface SupaStudyLectureRow {
  lecture_id: number
  crawled_lectures: LectureObj | LectureObj[] | null
}

export default function RecruitmentEdit() {
  const { uuid = '' } = useParams<{ uuid: string }>()
  const { state } = useLocation() as { state?: { draft?: EditDraft } }
  const draft = state?.draft

  const navigate = useNavigate()
  const toast = useToast()
  const draftId = useMemo(() => uuidv4(), [])
  const qc = useQueryClient()

  // 1) 그룹 목록
  const groupsQ = useQuery({
    queryKey: ['study_groups'],
    queryFn: async () => {
      const { data, error } = await supa
        .from('study_groups')
        .select('id,name')
        .order('name')
      if (error) throw error
      return (data ?? []) as { id: number; name: string }[]
    },
  })

  // 2) 공고 단건 (uuid로 조회)
  const recQ = useQuery({
    queryKey: ['recruitment', uuid],
    enabled: !!uuid,
    queryFn: async () => {
      const sel = `
        id, uuid, title, content, expected_headcount, close_at, study_group_id,
        estimated_fee,
        study_groups:study_group_id ( name )
      `
      const { data, error } = await supa
        .from('recruitments')
        .select(sel)
        .eq('uuid', uuid)
        .single()
      if (error) throw error
      return data as RawRec
    },
  })

  // 3) 폼 상태 (초기값은 draft 기준)
  const [title, setTitle] = useState(draft?.title ?? '')
  const [groupName, setGroupName] = useState<string | undefined>(
    draft?.groupName ?? undefined
  )
  const [capacityName, setCapacityName] = useState<string | undefined>(
    draft?.capacityName ?? undefined
  )
  const [deadline, setDeadline] = useState<Date | null>(draft?.deadline ?? null)
  const [markdown, setMarkdown] = useState<string>(draft?.markdown ?? '')
  const [priceRaw, setPriceRaw] = useState<string>(draft?.price ?? '')

  const hydratedRef = useRef(false)
  useEffect(() => {
    const r = recQ.data
    if (!r || hydratedRef.current) return

    setTitle((prev) => prev || r.title || '')
    setDeadline((prev) => prev ?? (r.close_at ? new Date(r.close_at) : null))
    setCapacityName(
      (prev) =>
        prev ?? (r.expected_headcount ? `${r.expected_headcount}명` : undefined)
    )
    setMarkdown((prev) => (prev !== '' ? prev : (r.content ?? '')))
    setPriceRaw((prev) =>
      prev !== ''
        ? prev
        : r.estimated_fee != null
          ? String(r.estimated_fee)
          : ''
    )

    hydratedRef.current = true
  }, [recQ.data])

  // 4) 표시용 그룹명 복원
  const resolvedGroupName = useMemo(() => {
    const row = recQ.data
    if (!row) return undefined
    const sg = row.study_groups
    const joinedName = Array.isArray(sg) ? sg[0]?.name : sg?.name
    if (joinedName) return joinedName ?? undefined
    if (!row.study_group_id) return undefined
    return groupsQ.data?.find((g) => g.id === row.study_group_id)?.name
  }, [recQ.data, groupsQ.data])

  useEffect(() => {
    if (!groupName && resolvedGroupName) setGroupName(resolvedGroupName)
  }, [resolvedGroupName, groupName])

  // 5) 드롭다운 옵션
  const groupOptions: string[] = useMemo(() => {
    const names = (groupsQ.data ?? []).map((g) => g.name)
    const current = groupName ?? resolvedGroupName
    return Array.from(new Set([...(current ? [current] : []), ...names]))
  }, [groupsQ.data, groupName, resolvedGroupName])

  // 6) 저장/프리뷰용 그룹 ID
  const selectedGroupIdForSave = useMemo(() => {
    if (groupName) {
      const found = groupsQ.data?.find((g) => g.name === groupName)?.id
      if (found) return found
    }
    return recQ.data?.study_group_id ?? null
  }, [groupName, groupsQ.data, recQ.data])

  // 7) 선택 그룹의 강의 목록 (미리보기)
  const groupCoursesQ = useQuery({
    queryKey: ['group_courses', selectedGroupIdForSave],
    enabled: !!selectedGroupIdForSave,
    queryFn: async (): Promise<DBGroupCourseRow[]> => {
      const { data, error } = await supa
        .from('study_lectures')
        .select(
          `
          lecture_id,
          crawled_lectures ( id, title, original_price, discount_price )
        `
        )
        .eq('study_group_id', selectedGroupIdForSave!)
      if (error) throw error
      const rows = (data ?? []) as unknown as SupaStudyLectureRow[]
      return rows.map((r) => ({
        lecture_id: r.lecture_id,
        crawled_lectures: Array.isArray(r.crawled_lectures)
          ? (r.crawled_lectures[0] ?? null)
          : r.crawled_lectures,
      }))
    },
  })

  // 8) 미리보기 + 합계
  const coursesPreview: PreviewCourse[] = useMemo(() => {
    return (groupCoursesQ.data ?? [])
      .map((r) => {
        const lec = r.crawled_lectures
        if (!lec) return null
        const priceCandidate = lec.discount_price ?? lec.original_price ?? 0
        const priceNum =
          typeof priceCandidate === 'string'
            ? Number(priceCandidate)
            : (priceCandidate ?? 0)
        return {
          id: lec.id,
          title: lec.title,
          price: Number.isFinite(priceNum) ? priceNum : 0,
        } as PreviewCourse
      })
      .filter(Boolean) as PreviewCourse[]
  }, [groupCoursesQ.data])

  const totalPricePreview = useMemo(
    () => coursesPreview.reduce((sum, c) => sum + (Number(c.price) || 0), 0),
    [coursesPreview]
  )

  // 9) 첨부파일
  const defaultFiles: PresetFileIn[] = useMemo(() => {
    const raw: FileLike[] = (draft?.files as FileLike[] | undefined) ?? []
    return raw.map((f) => ({
      id: String(f.id ?? f.key ?? f.url),
      name: f.name ?? '첨부파일',
      url: f.url,
      key: f.key !== undefined ? String(f.key) : undefined,
    }))
  }, [draft])

  // 10) 가격
  const derivedPrice = String(totalPricePreview)
  const finalPrice = toFinalPrice(priceRaw, derivedPrice)

  // 11) 검증
  const validate = () => {
    const messages: string[] = []
    if (!title?.trim()) messages.push(RECRUIT_EDIT_VALIDATION.title)
    if (!selectedGroupIdForSave) messages.push(RECRUIT_EDIT_VALIDATION.group)
    if (!capacityName) messages.push(RECRUIT_EDIT_VALIDATION.capacity)
    if (!deadline) messages.push(RECRUIT_EDIT_VALIDATION.deadline)
    if (!markdown?.trim()) messages.push(RECRUIT_EDIT_VALIDATION.content)
    return messages
  }

  // 12) 저장
  const m = useMutation({
    mutationFn: async () => {
      const payload = {
        title,
        content: markdown,
        expected_headcount: parseCapacity(capacityName),
        estimated_fee: Number(finalPrice),
        close_at: deadline ? deadline.toISOString() : null,
        study_group_id: selectedGroupIdForSave,
        updated_at: new Date().toISOString(),
      }
      const { data, error } = await supa
        .from('recruitments')
        .update(payload)
        .eq('uuid', uuid)
        .select('id, uuid, title, estimated_fee, updated_at')
        .single()
      if (error) throw error
      if (!data) throw new Error('수정된 행이 없습니다.')
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['myRecruitments'] })
      qc.invalidateQueries({ queryKey: ['recruitments'] })
      qc.invalidateQueries({ queryKey: ['recruitment', uuid] })
      toast.success(RECRUIT_EDIT_TOAST.success)
      navigate('/recruitment/manage')
    },
    onError: (err: unknown) => {
      const e = err as { message?: string; error_description?: string }
      const message =
        e?.message || e?.error_description || '알 수 없는 오류가 발생했습니다.'
      toast.error({ title: RECRUIT_EDIT_TOAST.error.title, content: message })
    },
  })

  const handleSubmit = () => {
    const errors = validate()
    if (errors.length > 0) {
      toast.error({
        title: RECRUIT_EDIT_TOAST.invalid.title,
        content: errors[0],
      })
      return
    }
    m.mutate()
  }

  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto mt-8 flex w-full max-w-[1120px] flex-col items-center gap-8 px-6 lg:px-12">
        <RecEditHeader />

        <RecEditBasicInfo
          title={title}
          groupName={groupName ?? resolvedGroupName}
          capacityName={capacityName}
          defaultDeadline={deadline}
          onTitleChange={setTitle}
          onGroupChange={setGroupName}
          onCapacityChange={setCapacityName}
          onDeadlineChange={setDeadline}
          groupOptions={groupOptions}
          coursesPreview={coursesPreview}
          totalPricePreview={totalPricePreview}
        />

        <RecEditContentSection
          draftId={draftId}
          defaultMarkDown={markdown}
          onChangeMarkDown={setMarkdown}
        />

        {/* 가격 입력엔 DB가격(priceRaw) 우선, 없으면 강의 합계(derivedPrice) */}
        <RecEditAdditionalInfo
          draftId={draftId}
          defaultPrice={priceRaw || derivedPrice}
          onPriceChange={setPriceRaw}
          defaultFiles={defaultFiles}
        />

        <RecEditFooter onSubmit={handleSubmit} submitting={m.isPending} />
      </div>
    </div>
  )
}
