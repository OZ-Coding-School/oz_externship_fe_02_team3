import RecruitmentBanner from '@components/recruitment-detail/recruitment-banner/RecruitmentBanner.tsx'
import BackButton from '@src/components/commons/BackButton'
import RecruitmentAttachmentList from '@src/components/recruitment-detail/recruitment-attachment-list/RecruitmentAttachmentList'
import RecruitmentContent from '@src/components/recruitment-detail/recruitment-content/RecruitmentContent'
import RecuitmentLecture from '@src/components/recruitment-detail/recuitment-courses/RecuitmentLecture'

export default function RecruitmentDetailPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[896px] p-8">
        <div className="w-full pb-6">
          <BackButton />
        </div>
        <div className="flex flex-col gap-8">
          <RecruitmentBanner />
          <RecruitmentContent />
          <RecuitmentLecture />
          <RecruitmentAttachmentList />
        </div>
      </div>
    </div>
  )
}
