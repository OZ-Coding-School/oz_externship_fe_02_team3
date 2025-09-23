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
  const hasActiveFilters = useFilterStore((state) => state.hasActiveFilters)

  const isFiltered = hasActiveFilters()

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

  // 원본 데이터
  const rawJobs: JobPost[] = useMemo(() => {
    return (
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
  }, [infiniteMode, infiniteData, initialData])

  const filteredJobs = useMemo(() => {
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

    if (selectedSort === '오래된순') {
      filtered = [...filtered].sort((a, b) => a.id - b.id)
    } else if (selectedSort === '인기순') {
      filtered = [...filtered].sort((a, b) => b.viewCount - a.viewCount)
    }

    return filtered
  }, [rawJobs, searchTerm, selectedTag, selectedSort])

  // 필터링된 개수 계산
  const totalCount = infiniteMode
    ? infiniteData?.pages[0]?.totalCount
    : initialData?.totalCount
  const filteredCount = filteredJobs.length

  // 표시할 개수와 텍스트 결정
  const displayCount = isFiltered ? filteredCount : totalCount || 0
  const displayText = isFiltered ? '검색 공고' : '전체 공고'

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
          displayText={displayText}
          displayCount={displayCount}
        />
      )}
    </div>
  )
}
