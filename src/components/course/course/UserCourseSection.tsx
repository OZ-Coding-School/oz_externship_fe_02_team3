import LoggedInCourses from '../sections/LoggedIncourses'
import AnonymousCourses from '../common/AnonyMousCourses'
import { cn } from '@src/utils/cn'

interface UserCourseSectionProps {
  isAuthenticated: boolean
}

export default function UserCourseSection({
  isAuthenticated,
}: UserCourseSectionProps) {
  const userStyle =
    'from-primary-50 border-primary-200 mx-auto inline-block w-full rounded-lg border bg-gradient-to-r to-[#FFF7ED] p-8'
  return isAuthenticated ? (
    <LoggedInCourses userStyle={userStyle} />
  ) : (
    <AnonymousCourses userStyle={userStyle} />
  )
}
