import RecEditAdditionalInfo from '@src/components/recruitment-edit/RecEditAdditionalInfo'
import RecEditBasicInfo from '@src/components/recruitment-edit/RecEditBasicInfo'
import RecEditContentSection from '@src/components/recruitment-edit/RecEditContentSection'
import RecEditFooter from '@src/components/recruitment-edit/RecEditFooter'
import RecEditHeader from '@src/components/recruitment-edit/RecEditHeader'
import { recMockDatas } from '@src/mock/recEditData'
import {
  getCoursesForGroup,
  sumCoursePrices,
} from '@src/mock/studyGroupCourseMap'
import { useMemo, useState } from 'react'

export default function RecruitmentEdit() {
  const MOCKDATA = recMockDatas[0]
  const [selectedGroupName, setSelectedGroupName] = useState<
    string | undefined
  >(MOCKDATA.groupName)
  const [priceOverride, setPriceOverride] = useState<string | null>(null)

  const groupCourses = useMemo(
    () => getCoursesForGroup(selectedGroupName),
    [selectedGroupName]
  )

  const derivedPrice = useMemo(
    () => String(sumCoursePrices(groupCourses)),
    [groupCourses]
  )

  const priceForInput = priceOverride ?? derivedPrice

  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto mt-8 flex w-full max-w-[1120px] flex-col gap-8 px-6 lg:px-12">
        <RecEditHeader />
        <RecEditBasicInfo
          title={MOCKDATA.title}
          groupName={MOCKDATA.groupName}
          capacityName={MOCKDATA.capacityName}
          defaultDeadline={MOCKDATA.deadline}
          onGroupChange={(name) => setSelectedGroupName(name)}
        />
        <RecEditContentSection />
        <RecEditAdditionalInfo />
        <RecEditFooter />
      </div>
    </div>
  )
}
