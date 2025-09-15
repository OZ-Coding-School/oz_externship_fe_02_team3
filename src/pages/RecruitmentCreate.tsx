import TagBox from '@src/components/recruitment-create/tag-ui/TagBox'
import RecCreateBasicInfo from '@src/components/recruitment-create/RecCreateBasicInfo'
import RecCreateAdditionalInfo from '@src/components/recruitment-create/RecCreateAdditionalInfo'
import RecCreateContentSection from '@src/components/recruitment-create/RecCreateContentSection'
import RecCreateHeader from '@src/components/recruitment-create/RecCreateHeader'

export default function RecruitmentCreate() {
  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto mt-8 flex w-full max-w-[1120px] flex-col gap-8 px-6 lg:px-12">
        <div>
          <RecCreateHeader />
        </div>
        <div>
          <RecCreateBasicInfo />
        </div>
        <div>
          <RecCreateContentSection />
        </div>
        <div>
          <RecCreateAdditionalInfo />
        </div>
      </div>
    </div>
  )
}
