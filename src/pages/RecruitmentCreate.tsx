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

export default function RecruitmentCreate() {
  const [studyGroup, setStudyGroup] = useState<string | undefined>()
  const [priceOverride, setPriceOverride] = useState<string | null>(null)

  const courses = useMemo(() => getCoursesForGroup(studyGroup), [studyGroup])
  const derivedPrice = useMemo(
    () => (courses.length ? String(sumCoursePrices(courses)) : ''),
    [courses]
  )

  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto mt-8 flex w-full max-w-[1120px] flex-col items-center gap-8 px-6 lg:px-12">
        <RecCreateHeader />
        <RecCreateBasicInfo
          onGroupChange={(name) => {
            setStudyGroup(name)
            setPriceOverride(null)
          }}
        />
        <RecCreateContentSection />
        <RecCreateAdditionalInfo
          derivedPrice={derivedPrice}
          override={priceOverride}
          onChangeOverride={(raw) => setPriceOverride(raw)}
        />
        <RecCreateFooter />
      </div>
    </div>
  )
}
