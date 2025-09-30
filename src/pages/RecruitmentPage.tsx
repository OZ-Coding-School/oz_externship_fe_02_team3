import UserRecruitment from '@components/recruitment/user-recruitment/UserRecruitment'
import RecruitmentList from '@src/components/recruitment/recruitment-list/RecruitmentList'
import RecruitmentHeader from '@src/components/recruitment/recruitment-header/RecruitmentHeader'
import SearchFilterBar from '@src/components/recruitment/srearch-filter-bar/SearchFilterBar'
import { useAuthLight } from '@src/store/authLight'

export default function RecruitmentPage() {
  const ready = useAuthLight((s) => s.ready)
  const isAuthenticated = useAuthLight((s) => s.loggedIn)

  if (!ready) {
    return (
      <div className="flex w-full flex-col gap-8 px-4 sm:px-16">
        <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
        <div className="h-40 animate-pulse rounded-xl bg-gray-100" />
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col justify-center gap-8 px-4 py-6 sm:px-16">
      <RecruitmentHeader isAuthenticated={isAuthenticated} />
      <UserRecruitment isAuthenticated={isAuthenticated} />
      <SearchFilterBar />
      <RecruitmentList />
    </div>
  )
}
