import Anonymous from './Anonymous'
import LoggedIn from './LoggedIn'

interface AuthBasedRecruitmentProps {
  isAuthenticated: boolean
}

export default function RecruitmentHeader({
  isAuthenticated,
}: AuthBasedRecruitmentProps) {
  return (
    <div className="flex w-[1216px] items-center justify-between">
      <div>
        <h2 className="pb-2 text-3xl font-bold">스터디 구인 공고</h2>
        <p className="text-gray-600">
          새로운 스터디 멤버를 찾거나 관심있는 스터디에 참여해보세요
        </p>
      </div>
      {isAuthenticated ? <LoggedIn /> : <Anonymous />}
    </div>
  )
}
