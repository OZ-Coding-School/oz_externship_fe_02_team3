import LoggedIn from './LoggedIn'
import Anonymous from './Anonymous'

interface UserCourseProps {
  isAuthenticated: boolean
}

export default function UserCourse({ isAuthenticated }: UserCourseProps) {
  const userStyle =
    'from-primary-50 border-primary-200 mx-auto block w-full rounded-lg border bg-gradient-to-r to-[#FFF7ED] p-8'
  return isAuthenticated ? (
    <LoggedIn userStyle={userStyle} />
  ) : (
    <Anonymous userStyle={userStyle} />
  )
}
