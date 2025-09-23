import { useState, useMemo } from 'react'
import { useInitialJobPosts, useInfiniteJobPosts } from '@hooks/useJobPosts'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { useFilterStore } from '@src/store/useJobFilterStore'
import type { JobPost } from '@src/types/jobPosts'
import { EmptyState } from '../../commons/EmptyState'
import { EMPTY_MESSAGES } from '@src/constants/ui'
import JobPostList from './JobPostList'

export default function RecruitmentList() {
  const [infiniteMode, setInfiniteMode] = useState(false)

  // 각 필터 값을 개별적으로 구독
  const searchTerm = useFilterStore((state) => state.searchTerm)
  const selectedTag = useFilterStore((state) => state.selectedTag)
  const selectedSort = useFilterStore((state) => state.selectedSort)

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

  // 필터링된 데이터
  const filteredJobs = useMemo(() => {
    const rawJobs: JobPost[] = (
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

    let filtered = rawJobs

    // 제목 검색
    if (searchTerm) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 태그 필터
    if (selectedTag !== '전체 태그') {
      filtered = filtered.filter((job) => job.tags.includes(selectedTag))
    }

    // 정렬
    if (selectedSort === '최신순') {
      filtered = [...filtered].sort((a, b) => b.id - a.id)
    } else if (selectedSort === '오래된순') {
      filtered = [...filtered].sort((a, b) => a.id - b.id)
    } else if (selectedSort === '인기순') {
      filtered = [...filtered].sort((a, b) => b.viewCount - a.viewCount)
    }

    return filtered
  }, [
    infiniteMode,
    infiniteData,
    initialData,
    searchTerm,
    selectedTag,
    selectedSort,
  ])

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
      {filteredJobs.length === 0 ? (
        emptyState
      ) : (
        <JobPostList
          jobs={filteredJobs}
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
