import { CourseHeader } from '@src/components/course/course-header/CourseHeader'
import { EmptyState } from '@src/components/commons/EmptyState'
import { cn } from '@src/utils/cn'
import { EMPTY_MESSAGES } from '@src/constants/ui'
export default function EmptyCourses({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto min-h-screen max-w-7xl', className)}>
      <CourseHeader />
      <EmptyState
        title={EMPTY_MESSAGES.COURSES}
        description="새로운 강의가 곧 업데이트될 예정입니다."
        iconType="COURSES"
        wrapperClassName="w-full px-8"
        iconClassName="stroke-primary-500 w-8 h-8"
        iconContainerClassName="bg-primary-50 rounded-full w-20 h-20 flex items-center justify-center"
      />
    </div>
  )
}
