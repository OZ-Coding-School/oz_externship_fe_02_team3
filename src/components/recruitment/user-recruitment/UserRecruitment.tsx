import LoggedIn from './LoggedIn'
import Anonymous from './Anonymous'

interface AuthBasedRecruitmentProps {
  isAuthenticated: boolean
}

export default function AuthBasedRecruitment({
  isAuthenticated,
}: AuthBasedRecruitmentProps) {
  const userStyle =
    'from-primary-50 border-primary-200 mx-auto inline-block w-full rounded-lg border bg-gradient-to-r to-[#FFF7ED] p-8'
  return isAuthenticated ? (
    <LoggedIn userStyle={userStyle} />
  ) : (
    <Anonymous userStyle={userStyle} />
  )
}
