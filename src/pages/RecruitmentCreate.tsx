import RecCreateBasicInfo from '@src/components/recruitment-create/RecCreateBasicInfo'
import RecCreateAdditionalInfo, {
  type PresetFile,
} from '@src/components/recruitment-create/RecCreateAdditionalInfo'
import RecCreateContentSection from '@src/components/recruitment-create/RecCreateContentSection'
import RecCreateHeader from '@src/components/recruitment-create/RecCreateHeader'
import RecCreateFooter from '@src/components/recruitment-create/RecCreateFooter'

import { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useToast } from '@components/commons/toast'
import { useNavigate } from 'react-router-dom'
import { useRecruitCreateForm } from '@src/hooks/useRecruitCreateForm'
import { useQuery } from '@tanstack/react-query'
import { supa } from '@src/lib/supabase'
import type { Tag } from '@src/types/tag'

// ── Types (Supabase rows)
type NumStrNull = number | string | null
interface LectureObj {
  id: number
  title: string
  original_price: NumStrNull
  discount_price: NumStrNull
}
interface StudyLectureRow {
  lecture_id: number
  crawled_lectures: LectureObj | LectureObj[] | null
}

export default function RecruitmentCreate() {
  const toast = useToast()
  const navigate = useNavigate()
  const draftId = useMemo(() => uuidv4(), [])

  const [priceOverride, setPriceOverride] = useState<string | null>(null)
  const [selectedGroupIdForPrice, setSelectedGroupIdForPrice] = useState<
    number | null
  >(null)
  const [tags, setTags] = useState<Tag[]>([])
  const [files, setFiles] = useState<PresetFile[]>([])

  const {
    canSubmit,
    onTitleChange,
    onStudyGroupIdChange,
    onDeadlineChange,
    onExpectedHeadcountChange,
    onContentChange,
    handleSubmit,
  } = useRecruitCreateForm({
    notify: {
      success: (title, content) => toast.success({ title, content }),
      error: (title, content) => toast.error({ title, content }),
    },
    onSuccess: () => navigate(-1),
  })

  const handleStudyGroupIdChange = (id: number | null) => {
    onStudyGroupIdChange(id)
    setSelectedGroupIdForPrice(id)
    setPriceOverride(null)
  }

  const coursesQ = useQuery({
    queryKey: ['group_courses', selectedGroupIdForPrice],
    enabled: !!selectedGroupIdForPrice,
    queryFn: async (): Promise<StudyLectureRow[]> => {
      const { data, error } = await supa
        .from('study_lectures')
        .select(
          `
          lecture_id,
          crawled_lectures ( id, title, original_price, discount_price )
        `
        )
        .eq('study_group_id', selectedGroupIdForPrice!)
      if (error) throw error
      return (data ?? []) as unknown as StudyLectureRow[]
    },
  })

  // 자동 계산 금액
  const derivedPrice = useMemo(() => {
    const rows: StudyLectureRow[] = coursesQ.data ?? []
    const sum = rows.reduce((acc: number, r: StudyLectureRow) => {
      const lec: LectureObj | null = Array.isArray(r.crawled_lectures)
        ? (r.crawled_lectures[0] ?? null)
        : r.crawled_lectures
      if (!lec) return acc
      const priceCandidate: NumStrNull =
        lec.discount_price ?? lec.original_price ?? 0
      const priceNum =
        typeof priceCandidate === 'string'
          ? Number(priceCandidate)
          : (priceCandidate ?? 0)
      return acc + (Number.isFinite(priceNum) ? priceNum : 0)
    }, 0)
    return sum ? String(sum) : ''
  }, [coursesQ.data])

  const finalFee: number | null = useMemo(() => {
    const raw = priceOverride === null ? derivedPrice : priceOverride
    return raw ? Number(raw) : null
  }, [priceOverride, derivedPrice])

  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto mt-8 flex w-full max-w-[1120px] flex-col items-center gap-8 px-6 lg:px-12">
        <RecCreateHeader />

        <RecCreateBasicInfo
          onTitleChange={onTitleChange}
          onStudyGroupIdChange={handleStudyGroupIdChange}
          onDeadlineChange={onDeadlineChange}
          onExpectedHeadcountChange={onExpectedHeadcountChange}
        />

        <RecCreateContentSection
          draftId={draftId}
          onContentChange={onContentChange}
        />

        <RecCreateAdditionalInfo
          draftId={draftId}
          derivedPrice={derivedPrice}
          override={priceOverride}
          onChangeOverride={(raw) => setPriceOverride(raw)}
          tags={tags}
          onTagsChange={setTags}
          files={files}
          onFilesChange={setFiles}
        />

        <RecCreateFooter
          canSubmit={canSubmit}
          onSubmit={() =>
            handleSubmit({
              estimatedFee: finalFee,
              tags,
              files,
            })
          }
        />
      </div>
    </div>
  )
}
