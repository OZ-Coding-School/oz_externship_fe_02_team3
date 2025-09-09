import { useState } from 'react'
import { useInitialJobPosts, useInfiniteJobPosts } from '@hooks/useJobPosts'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import JobPostCard from '@components/commons/JobPostCard'
import Button from '@components/commons/button/Button'
import type { JobPost } from '@src/types/jobPosts'

export default function RecruitmentList() {
  const [infiniteMode, setInfiniteMode] = useState(false)

  // 초기 데이터 로드
  const { data: initialData, isLoading: isInitialLoading } =
    useInitialJobPosts()

  // 무한 스크롤 설정
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteJobPosts({
    enabled: infiniteMode,
    initialData: infiniteMode ? initialData : undefined,
  })

  // 전체 개수 계산
  const totalCount = infiniteMode
    ? infiniteData?.pages[0]?.totalCount
    : initialData?.totalCount

  // 스크롤 감지
  const loadMoreRef = useIntersectionObserver({
    enabled: infiniteMode,
    hasNextPage,
    isFetchingNextPage,
    onIntersect: fetchNextPage,
    threshold: 1,
  })

  if (isInitialLoading) return <p>Loading...</p>

  // 데이터 통합
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

  return (
    <div className="flex flex-col items-center">
      <h4 className="w-full pb-[24px] text-xl font-semibold">
        전체 공고 ({totalCount})
      </h4>
      <ul className="w-[1216px]">
        {jobs.map((job) => (
          <li key={job.id} className="rounded-lg bg-white">
            <JobPostCard post={job} />
          </li>
        ))}
      </ul>

      {!infiniteMode ? (
        <Button
          buttonInnerText="더 많은 공고 보기"
          variant="secondary"
          className="mt-8"
          onClick={() => setInfiniteMode(true)}
        ></Button>
      ) : (
        <div ref={loadMoreRef} style={{ height: '1px' }} />
      )}

      {isFetchingNextPage && <p>더 많은 공고 목록 불러오는 중...</p>}
    </div>
  )
}
