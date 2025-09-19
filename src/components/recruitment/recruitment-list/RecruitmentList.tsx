import { useState } from 'react'
import { Plus as PlusIcon } from 'lucide-react'
import { useInitialJobPosts, useInfiniteJobPosts } from '@hooks/useJobPosts'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import JobPostCard from '@components/commons/JobPostCard'
import Button from '@components/commons/button/Button'
import type { JobPost } from '@src/types/jobPosts'
import { EmptyState } from '../../commons/EmptyState'
import { EMPTY_MESSAGES } from '@src/constants/ui'

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

  if (isInitialLoading) return <p className="text-gray-600">Loading...</p>

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
      <h4 className="w-full pb-[24px] text-xl font-semibold">
        전체 공고 ({totalCount})
      </h4>
      {jobs.length === 0 ? (
        emptyState
      ) : (
        <div>
          <ul className="w-[1216px]">
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
              ></Button>
            ) : (
              <div ref={loadMoreRef} style={{ height: '1px' }} />
            )}

            {isFetchingNextPage && (
              <p className="text-gray-600">불러오는 중...</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
