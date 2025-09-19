import LoggedInCourses from '../sections/LoggedIncourses'
import AnonymousCourses from '../common/AnonyMousCourses'
import { cn } from '@src/utils/cn'

interface UserCourseSectionProps {
  isAuthenticated: boolean
}

export default function UserCourseSection({
  isAuthenticated,
}: UserCourseSectionProps) {
  return (
    <div className="from-primary-50 border-primary-200 mb-12 inline-block w-full rounded-lg border bg-gradient-to-r to-[#FFF7ED] p-8">
      <div className={cn(!isAuthenticated && 'hidden')}>
        <LoggedInCourses />
      </div>
      <div className={cn(isAuthenticated && 'hidden')}>
        <AnonymousCourses />
      </div>
    </div>
  )
}
