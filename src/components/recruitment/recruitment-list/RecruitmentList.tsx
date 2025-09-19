import { useState } from 'react'
import { useInitialJobPosts, useInfiniteJobPosts } from '@hooks/useJobPosts'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import type { JobPost } from '@src/types/jobPosts'
import { EmptyState } from '../../commons/EmptyState'
import { EMPTY_MESSAGES } from '@src/constants/ui'
import JobPostList from './JobPostList'

export default function RecruitmentList() {
  const [infiniteMode, setInfiniteMode] = useState(false)

  const { data: initialData, isLoading: isInitialLoading } =
    useInitialJobPosts()

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteJobPosts({
    enabled: infiniteMode,
    initialData: infiniteMode ? initialData : undefined,
  })

  const totalCount = infiniteMode
    ? infiniteData?.pages[0]?.totalCount
    : initialData?.totalCount

  const loadMoreRef = useIntersectionObserver({
    enabled: infiniteMode,
    hasNextPage,
    isFetchingNextPage,
    onIntersect: fetchNextPage,
    threshold: 1,
  })

  if (isInitialLoading) return <p className="text-gray-600">Loading...</p>

  const jobs: JobPost[] = (
    infiniteMode
      ? (infiniteData?.pages.flatMap(
          (page: { items: JobPost[] }) => page.items
        ) ??
        initialData?.items ??
        [])
      : (initialData?.items ?? [])
  ).map((post: JobPost) => ({
    ...post,
    image: post.image,
  }))

  const emptyState = (
    <EmptyState
      title={EMPTY_MESSAGES.NoData}
      description="새로운 공고가 등록되면 이곳에 표시됩니다."
      iconType="NoData"
      iconClassName="stroke-primary-500 w-8 h-8"
      iconContainerClassName="bg-primary-50 rounded-full w-20 h-20 flex items-center justify-center"
    />
  )

  return (
    <div className="flex flex-col items-center">
      {jobs.length === 0 ? (
        emptyState
      ) : (
        <JobPostList
          jobs={jobs}
          infiniteMode={infiniteMode}
          setInfiniteMode={setInfiniteMode}
          loadMoreRef={loadMoreRef}
          isFetchingNextPage={isFetchingNextPage}
          totalCount={totalCount}
        />
      )}
    </div>
  )
}
