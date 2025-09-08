import LoggedInCourses from './LoggedInCourses'
import AnonymousCourses from './AnonymousCourses'

interface AuthBasedCourseSectionProps {
  isAuthenticated: boolean
}

export default function AuthBasedCourseSection({
  isAuthenticated,
}: AuthBasedCourseSectionProps) {
  return (
    <div className="from-primary-50 border-primary-200 mb-12 inline-block w-full rounded-lg border bg-gradient-to-r to-[#FFF7ED] p-8">
      {isAuthenticated ? <LoggedInCourses /> : <AnonymousCourses />}
    </div>
  )
}
