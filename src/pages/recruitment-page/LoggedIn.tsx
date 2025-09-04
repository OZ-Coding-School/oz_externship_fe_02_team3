import JobPostCard from '@components/JobPostCard'
import { RecruitmentJobPosts } from '@mock/jobPosts'

export default function LoggedIn() {
  const userName = '김스터디' // 임시

  return (
    <div className="w-[1216px]">
      <div className="mb-6 flex items-center">
        <div className="mr-6 text-xl font-semibold">
          <span className="text-primary-600">{userName} </span>
          <span className="text-gray-800/80">님을 위한 맞춤 스터디 공고</span>
        </div>
        <div className="rounded bg-[#EA580C] px-2 py-1 text-sm text-white">
          개인화 추천
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {RecruitmentJobPosts.map((post) => (
          <div key={post.id} className="relative">
            <JobPostCard post={post} />
            <div className="bg-primary-500 absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full text-sm text-white">
              ★
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
