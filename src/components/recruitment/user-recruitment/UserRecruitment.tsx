import LoggedIn from './LoggedIn'
import Anonymous from './Anonymous'

interface AuthBasedRecruitmentProps {
  isAuthenticated: boolean
}

export default function AuthBasedRecruitment({
  isAuthenticated,
}: AuthBasedRecruitmentProps) {
  return (
    <div className="from-primary-50 border-primary-200 inline-block rounded-lg border bg-gradient-to-r to-[#FFF7ED] p-8">
      {isAuthenticated ? <LoggedIn /> : <Anonymous />}
    </div>
  )
}
