import RecruitmentBanner from '@components/recruitment-detail/recruitment-banner/RecruitmentBanner.tsx'
import BackButton from '@src/components/commons/BackButton'
import RecruitmentContent from '@src/components/recruitment-detail/recruitment-content/RecruitmentContent'
import RecuitmentCourses from '@src/components/recruitment-detail/recuitment-courses/RecuitmentCourses'

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
          <RecuitmentCourses />
        </div>
      </div>
    </div>
  )
}
