import RecEditAdditionalInfo from '@src/components/recruitment-edit/RecEditAdditionalInfo'
import RecEditBasicInfo from '@src/components/recruitment-edit/RecEditBasicInfo'
import RecEditContentSection from '@src/components/recruitment-edit/RecEditContentSection'
import RecEditFooter from '@src/components/recruitment-edit/RecEditFooter'
import RecEditHeader from '@src/components/recruitment-edit/RecEditHeader'

export default function RecruitmentEdit() {
  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto mt-8 flex w-full max-w-[1120px] flex-col gap-8 px-6 lg:px-12">
        <RecEditHeader />
        <RecEditBasicInfo />
        <RecEditContentSection />
        <RecEditAdditionalInfo />
        <RecEditFooter />
      </div>
    </div>
  )
}
