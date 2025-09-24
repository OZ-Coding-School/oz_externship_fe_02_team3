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
}

export default function JobPostList({
  jobs,
  infiniteMode,
  setInfiniteMode,
  loadMoreRef,
  isFetchingNextPage,
  displayText,
  displayCount,
}: JobPostListProps) {
  return (
    <div className="mx-auto w-full max-w-[1216px]">
      <h4 className="pb-[24px] text-xl font-semibold">
        {displayText} ({displayCount})
      </h4>
      <ul className="flex flex-col gap-2">
        {jobs.map((job) => (
          <li key={job.id} className="rounded-lg bg-white">
            <JobPostCard post={job} />
          </li>
        ))}
      </ul>

      <div className="flex h-30 items-center justify-center">
        {!infiniteMode ? (
          <Button
            buttonInnerText="더 많은 공고 보기"
            icon={PlusIcon}
            variant="secondary"
            onClick={() => setInfiniteMode(true)}
          />
        ) : (
          <div ref={loadMoreRef} style={{ height: '1px' }} />
        )}

        {isFetchingNextPage && <p className="text-gray-600">불러오는 중...</p>}
      </div>
    </div>
  )
}
