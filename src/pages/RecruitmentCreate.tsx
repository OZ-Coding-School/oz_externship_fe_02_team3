import RecCreateBasicInfo from '@src/components/recruitment-create/RecCreateBasicInfo'
import RecCreateAdditionalInfo from '@src/components/recruitment-create/RecCreateAdditionalInfo'
import RecCreateContentSection from '@src/components/recruitment-create/RecCreateContentSection'
import RecCreateHeader from '@src/components/recruitment-create/RecCreateHeader'
import RecCreateFooter from '@src/components/recruitment-create/RecCreateFooter'

export default function RecruitmentCreate() {
  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto mt-8 flex w-full max-w-[1120px] flex-col gap-8 px-6 lg:px-12">
        <RecCreateHeader />
        <RecCreateBasicInfo />
        <RecCreateContentSection />
        <RecCreateAdditionalInfo />
        <RecCreateFooter />
      </div>
    </div>
  )
}
