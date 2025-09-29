import { useState, useMemo, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchJobPosts, type JobPostSort } from '@api/jobPosts'
import { useFilterStore } from '@src/store/useJobFilterStore'
import type { JobPost, JobPostsResponse } from '@src/types/jobPosts'
import { EmptyState } from '../../commons/EmptyState'
import { EMPTY_MESSAGES } from '@src/constants/ui'
import JobPostList from './JobPostList'
import { useInfiniteScroll } from '@src/hooks/useInfiniteScroll'

export default function RecruitmentList() {
  const [infiniteMode, setInfiniteMode] = useState(true)

  const searchTerm = useFilterStore((s) => s.searchTerm)
  const selectedTag = useFilterStore((s) => s.selectedTag)
  const selectedSort = useFilterStore((s) => s.selectedSort)
  const hasActive = useFilterStore((s) => s.hasActiveFilters)

  useEffect(() => {
    if (hasActive()) setInfiniteMode(true)
  }, [hasActive])

  const sort: JobPostSort =
    selectedSort === '오래된순'
      ? 'oldest'
      : selectedSort === '인기순'
        ? 'popular'
        : 'latest'
  const tag = selectedTag !== '전체 태그' ? selectedTag : undefined

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<JobPostsResponse>({
      queryKey: ['jobPosts', { searchTerm, tag, sort }],
      queryFn: ({ pageParam = 1 }) =>
        fetchJobPosts({
          pageParam: pageParam as number,
          search: searchTerm,
          tag,
          sort,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasNext ? allPages.length + 1 : undefined,
    })

  const jobs: JobPost[] = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  )

  const totalCount = data?.pages[0]?.totalCount ?? 0
  const displayCount = hasActive() ? jobs.length : totalCount
  const displayText = hasActive() ? '검색 공고' : '전체 공고'

  const loadMoreRef = useInfiniteScroll({
    enabled: infiniteMode,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    onLoadMore: async () => {
      await fetchNextPage()
    },
    rootMargin: '400px 0px',
    threshold: 0,
  })

  if (isLoading) return <p className="text-gray-600">Loading...</p>

  return (
    <div className="flex flex-col items-center">
      {jobs.length === 0 ? (
        <EmptyState
          title={EMPTY_MESSAGES.NoData}
          description="새로운 공고가 등록되면 이곳에 표시됩니다."
          iconType="NoData"
          iconClassName="stroke-primary-500 w-8 h-8"
          iconContainerClassName="bg-primary-50 rounded-full w-20 h-20 flex items-center justify-center"
        />
      ) : (
        <JobPostList
          jobs={jobs}
          infiniteMode={infiniteMode}
          setInfiniteMode={setInfiniteMode}
          loadMoreRef={loadMoreRef}
          isFetchingNextPage={isFetchingNextPage}
          displayText={displayText}
          displayCount={displayCount}
          hasNextPage={!!hasNextPage}
        />
      )}
    </div>
  )
}
