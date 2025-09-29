import JobPostCard from '@components/commons/JobPostCard'
import Button from '@components/commons/button/Button'
import { Plus as PlusIcon } from 'lucide-react'
import type { JobPost } from '@src/types/jobPosts'
import type { RefObject } from 'react'

interface JobPostListProps {
  jobs: JobPost[]
  infiniteMode: boolean
  setInfiniteMode: (value: boolean) => void
  loadMoreRef: RefObject<HTMLDivElement | null>
  isFetchingNextPage: boolean
  displayText: string
  displayCount: number | undefined
  hasNextPage: boolean
}

export default function JobPostList({
  jobs,
  infiniteMode,
  setInfiniteMode,
  loadMoreRef,
  isFetchingNextPage,
  displayText,
  displayCount,
  hasNextPage,
}: JobPostListProps) {
  return (
    <div className="mx-auto w-full max-w-[1216px]">
      <h4 className="pb-[24px] text-xl font-semibold">
        {displayText} ({displayCount})
      </h4>

      <ul className="flex flex-col gap-2">
        {jobs.map((job) => (
          <li key={job.uuid} className="rounded-lg bg-white">
            <JobPostCard post={job} />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center py-6">
        {!infiniteMode ? (
          <Button
            buttonInnerText="더 많은 공고 보기"
            icon={PlusIcon}
            variant="secondary"
            onClick={() => setInfiniteMode(true)}
          />
        ) : hasNextPage ? (
          <div ref={loadMoreRef} className="h-12 w-full" />
        ) : (
          <p className="text-gray-400">마지막 페이지</p>
        )}
      </div>

      {isFetchingNextPage && (
        <p className="pb-6 text-center text-gray-500">불러오는 중…</p>
      )}
    </div>
  )
}
