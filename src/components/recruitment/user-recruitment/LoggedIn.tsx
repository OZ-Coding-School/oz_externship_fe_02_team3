import JobPostCard from '@components/commons/JobPostCard'
import { RecruitmentJobPosts } from '@mock/jobPosts'
import { SCROLLBAR_STYLES } from '@src/constants/ui'
import { useHorizontalScroll } from '@src/hooks/useHorizontalScroll'
import { cn } from '@src/utils/cn'

interface LoggedInProps {
  userStyle: string
}

export default function LoggedIn({ userStyle }: LoggedInProps) {
  const { ref } = useHorizontalScroll()
  const userName = '김스터디' // 임시

  return (
    <div className={`max-w-[1306px] ${userStyle}`}>
      <div className="mb-6 flex items-center">
        <div className="mr-6 text-xl font-semibold">
          <span className="text-primary-600">{userName} </span>
          <span className="text-gray-800/80">님을 위한 맞춤 스터디 공고</span>
        </div>
        <div className="rounded bg-[#EA580C] px-2 py-1 text-sm text-white">
          개인화 추천
        </div>
      </div>
      <div
        ref={ref}
        className={cn(
          'overflow-x-auto overflow-y-hidden pt-2 pb-4',
          SCROLLBAR_STYLES
        )}
      >
        <div className="flex gap-6">
          {RecruitmentJobPosts.map((post) => (
            <div key={post.id} className="relative">
              <div className="h-full w-[394px]">
                <JobPostCard post={post} />
              </div>
              <div className="bg-primary-500 absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full text-sm text-white">
                ★
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
