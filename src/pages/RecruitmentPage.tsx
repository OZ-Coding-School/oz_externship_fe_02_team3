import { useState } from 'react'
import UserRecruitment from '@components/recruitment/user-recruitment/UserRecruitment'
import RecruitmentList from '@components/recruitment/RecruitmentList'
import RecruitmentHeader from '@components/recruitment/RecruitmentHeader'

export default function RecruitmentPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const toggleAuth = () => setIsAuthenticated((prev) => !prev)

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      {/* 로그인, 로그아웃 확인용 임시 버튼 */}
      <button
        onClick={toggleAuth}
        className="mb-6 rounded-lg bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
      >
        {isAuthenticated ? '로그아웃 상태로 전환' : '로그인 상태로 전환'}
      </button>
      <RecruitmentHeader />
      <UserRecruitment isAuthenticated={isAuthenticated} />
      <RecruitmentList />
    </div>
  )
}
