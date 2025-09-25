import RecCreateBasicInfo from '@src/components/recruitment-create/RecCreateBasicInfo'
import RecCreateAdditionalInfo from '@src/components/recruitment-create/RecCreateAdditionalInfo'
import RecCreateContentSection from '@src/components/recruitment-create/RecCreateContentSection'
import RecCreateHeader from '@src/components/recruitment-create/RecCreateHeader'
import RecCreateFooter from '@src/components/recruitment-create/RecCreateFooter'
import { useMemo, useState } from 'react'
import {
  getCoursesForGroup,
  sumCoursePrices,
} from '@src/mock/studyGroupCourseMap'
import { useToast } from '@components/commons/toast'
import { useNavigate } from 'react-router-dom'

interface RequiredForm {
  title: string
  content: string
  close_at: string | null // 'YYYY-MM-DDTHH:MM:SS'
  expected_headcount: number | null
  study_group: number | null
}

const toIsoNoZ = (d: Date | null) =>
  d
    ? new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 19)
    : null

export default function RecruitmentCreate() {
  const toast = useToast()
  const navigate = useNavigate()
  const [studyGroupName, setStudyGroupName] = useState<string | undefined>()
  const [priceOverride, setPriceOverride] = useState<string | null>(null)
  const courses = useMemo(
    () => getCoursesForGroup(studyGroupName),
    [studyGroupName]
  )
  const derivedPrice = useMemo(
    () => (courses.length ? String(sumCoursePrices(courses)) : ''),
    [courses]
  )
  const [requiredForm, setRequiredForm] = useState<RequiredForm>({
    title: '',
    content: '',
    close_at: null,
    expected_headcount: null,
    study_group: null,
  })

  const canSubmit =
    requiredForm.title.trim().length > 0 &&
    requiredForm.content.trim().length > 0 &&
    !!requiredForm.close_at &&
    typeof requiredForm.expected_headcount === 'number' &&
    requiredForm.expected_headcount >= 1 &&
    requiredForm.expected_headcount <= 10 &&
    typeof requiredForm.study_group === 'number'

  const handleSubmit = () => {
    if (!canSubmit) {
      if (!requiredForm.title.trim()) {
        toast.error({
          title: '등록 실패',
          content: '공고 제목을 입력해 주세요.',
        })
        return
      }
      if (requiredForm.study_group == null) {
        toast.error({
          title: '등록 실패',
          content: '대상 스터디 그룹을 선택해 주세요.',
        })
        return
      }
      if (!requiredForm.close_at) {
        toast.error({
          title: '등록 실패',
          content: '마감 기한을 선택해 주세요.',
        })
        return
      }
      if (
        requiredForm.expected_headcount == null ||
        requiredForm.expected_headcount < 1 ||
        requiredForm.expected_headcount > 10
      ) {
        toast.error({
          title: '등록 실패',
          content: '모집 인원을 세팅해주세요.',
        })
        return
      }
      if (!requiredForm.content.trim()) {
        toast.error({
          title: '등록 실패',
          content: '공고 내용을 입력해 주세요.',
        })
        return
      }

      return
    }
    toast.success({
      title: '검증 통과',
      content: '공고 작성이 성공하였습니다.',
    })
    navigate(-1)
  }

  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto mt-8 flex w-full max-w-[1120px] flex-col items-center gap-8 px-6 lg:px-12">
        <RecCreateHeader />

        <RecCreateBasicInfo
          onGroupChange={(name) => {
            setStudyGroupName(name)
            setPriceOverride(null)
          }}
          onTitleChange={(v) => setRequiredForm((s) => ({ ...s, title: v }))}
          onStudyGroupIdChange={(id) =>
            setRequiredForm((s) => ({ ...s, study_group: id }))
          }
          onDeadlineChange={(d) =>
            setRequiredForm((s) => ({ ...s, close_at: toIsoNoZ(d) }))
          }
          onExpectedHeadcountChange={(n) =>
            setRequiredForm((s) => ({ ...s, expected_headcount: n }))
          }
        />

        <RecCreateContentSection
          onContentChange={(v) =>
            setRequiredForm((s) => ({ ...s, content: v }))
          }
        />

        <RecCreateAdditionalInfo
          derivedPrice={derivedPrice}
          override={priceOverride}
          onChangeOverride={(raw) => setPriceOverride(raw)}
        />

        <RecCreateFooter canSubmit={canSubmit} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
