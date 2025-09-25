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
import { useRecruitCreateForm } from '@src/hooks/useRecruitCreateForm'

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

  // ── 폼 훅
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

  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto mt-8 flex w-full max-w-[1120px] flex-col items-center gap-8 px-6 lg:px-12">
        <RecCreateHeader />

        <RecCreateBasicInfo
          onGroupChange={(name) => {
            setStudyGroupName(name)
            setPriceOverride(null)
          }}
          onTitleChange={onTitleChange}
          onStudyGroupIdChange={onStudyGroupIdChange}
          onDeadlineChange={onDeadlineChange}
          onExpectedHeadcountChange={onExpectedHeadcountChange}
        />

        <RecCreateContentSection onContentChange={onContentChange} />

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
