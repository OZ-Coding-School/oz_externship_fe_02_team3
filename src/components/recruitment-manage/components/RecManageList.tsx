import JobPostCard from '@components/commons/JobPostCard'
import { EmptyState } from '@src/components/commons/EmptyState'
import { EMPTY_MESSAGES } from '@src/constants/ui'
import { useEffect, useRef, useState } from 'react'
import type { RecruitmentMeItem } from '@src/api/supabase/recManage.type'
import MobileJobPostCard from './MobileJobPostCard'
import ManageApplicantsModal from './ManageApplicantsModal'

interface Props {
  items: RecruitmentMeItem[]
  loading: boolean
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
  totalCount: number
}

const PLACEHOLDER = 'https://placehold.co/128x96'

export default function RecManageList({
  items,
  loading,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  totalCount,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // 지원자 관리 모달 제어
  const [openManage, setOpenManage] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState<string>('')
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  const openApplicantsModal = (id: number, title: string) => {
    setSelectedPostId(id)
    setSelectedTitle(title)
    setOpenManage(true)
  }

  useEffect(() => {
    if (!sentinelRef.current) return
    const el = sentinelRef.current
    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore()
        }
      },
      { rootMargin: '200px 0px' }
    )
    io.observe(el)
    return () => io.unobserve(el)
  }, [hasNextPage, isFetchingNextPage, onLoadMore])

  const cards = items.map((it) => ({
    post: {
      id: it.id,
      title: it.title,
      viewCount: it.views_count,
      commentCount: 0,
      bookmarkCount: it.bookmarks_count ?? 0,
      memberLimit: it.expected_headcount,
      deadline: new Date(it.close_at).toLocaleDateString('ko-KR'),
      courses: it.lectures.map((l) => `${l.title} - ${l.instructor}`),
      tags: it.tags,
      image: it.img ?? PLACEHOLDER,
    },
    editTo: `/recruitment/${it.id}/edit`,
    applyLabel: '지원 내역',
    onClickApply: () => openApplicantsModal(it.id, it.title),
  }))

  const isEmpty = !loading && items.length === 0

  return (
    <section>
      <p className="mb-6 text-[20px] leading-7 font-semibold">
        내 공고 목록 ({totalCount})
      </p>

      <ul className="flex flex-col gap-2">
        {cards.map((item, i) => (
          <li key={i}>
            <div className="sm:hidden">
              <MobileJobPostCard {...item} />
            </div>
            <div className="hidden rounded-lg bg-white sm:block">
              <JobPostCard {...item} />
            </div>
          </li>
        ))}

        {isEmpty && (
          <EmptyState
            title={EMPTY_MESSAGES.NoData}
            description="새로운 공고가 등록되면 이곳에 표시됩니다."
            iconType="NoData"
            iconClassName="stroke-primary-500 w-8 h-8"
            iconContainerClassName="bg-primary-50 rounded-full w-20 h-20 flex items-center justify-center"
          />
        )}
      </ul>

      <div ref={sentinelRef} />

      {(loading || isFetchingNextPage) && (
        <div className="py-6 text-center text-sm text-gray-500">
          불러오는 중…
        </div>
      )}

      {!hasNextPage && items.length > 0 && (
        <div className="py-6 text-center text-sm text-gray-400">
          마지막 페이지
        </div>
      )}

      {selectedPostId !== null && (
        <ManageApplicantsModal
          open={openManage}
          onClose={() => setOpenManage(false)}
          title={selectedTitle}
          recruitmentUuid={String(selectedPostId)}
        />
      )}
    </section>
  )
}
