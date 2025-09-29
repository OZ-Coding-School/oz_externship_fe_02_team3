import JobPostCard from '@components/commons/JobPostCard'
import { EmptyState } from '@src/components/commons/EmptyState'
import { EMPTY_MESSAGES } from '@src/constants/ui'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { RecruitmentMeItem } from '@src/api/supabase/recManage.type'
import MobileJobPostCard from './MobileJobPostCard'
import ManageApplicantsModal from './ManageApplicantsModal'
import { extractFirstImageFromMarkdown } from '@src/utils/extractFirstImage'

interface Props {
  items: RecruitmentMeItem[]
  loading: boolean
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
  totalCount: number
}

const PLACEHOLDER = 'https://placehold.co/128x96'
const fmtDate = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' })

type RecMeWithExtras = RecruitmentMeItem & {
  content?: string | null
  img?: string | null
  recruitment_images?: { img_url: string }[] | null
}

function pickCoverImage(it: RecMeWithExtras) {
  const fromMd = extractFirstImageFromMarkdown(it.content ?? '') || null
  const fromRel = it.img ?? it.recruitment_images?.[0]?.img_url ?? null
  return fromMd || fromRel || PLACEHOLDER
}

function toCardItem(it: RecruitmentMeItem) {
  const postImage = pickCoverImage(it as RecMeWithExtras)

  return {
    post: {
      id: it.id,
      uuid: it.uuid,
      title: it.title,
      viewCount: it.views_count ?? 0,
      bookmarkCount: it.bookmarks_count ?? 0,
      commentCount: 0,
      memberLimit: it.expected_headcount ?? 0,
      deadline: fmtDate.format(new Date(it.close_at)),
      courses: (it.lectures ?? []).map((l) => `${l.title} - ${l.instructor}`),
      tags: it.tags ?? [],
      image: postImage,
    },
    editTo: `/recruitment/${it.uuid}/edit`,
  } as const
}

export default function RecManageList({
  items,
  loading,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  totalCount,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const [removedUuids, setRemovedUuids] = useState<Set<string>>(new Set())
  const [openManage, setOpenManage] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState<string>('')
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null)

  const openApplicantsModal = (uuid: string, title: string) => {
    setSelectedUuid(uuid)
    setSelectedTitle(title)
    setOpenManage(true)
  }

  const visibleItems = useMemo(
    () => items.filter((it) => !removedUuids.has(it.uuid)),
    [items, removedUuids]
  )

  const cards = useMemo(() => {
    return visibleItems.map((it) => {
      const base = toCardItem(it)
      return {
        ...base,
        applyLabel: '지원 내역',
        onClickApply: () => openApplicantsModal(it.uuid, it.title),
        canDelete: true,
        onDeleted: (uuid: string) =>
          setRemovedUuids((prev) => {
            const next = new Set(prev)
            next.add(uuid)
            return next
          }),
      }
    })
  }, [visibleItems])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
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
    return () => {
      io.unobserve(el)
      io.disconnect()
    }
  }, [hasNextPage, isFetchingNextPage, onLoadMore])

  const isEmpty = !loading && visibleItems.length === 0

  return (
    <section>
      <p className="mb-6 text-[20px] leading-7 font-semibold">
        내 공고 목록 ({totalCount})
      </p>

      <ul className="flex flex-col gap-2">
        {cards.map((item) => (
          <li key={item.post.uuid}>
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

      {!hasNextPage && visibleItems.length > 0 && (
        <div className="py-6 text-center text-sm text-gray-400">
          마지막 페이지
        </div>
      )}

      {selectedUuid && (
        <ManageApplicantsModal
          open={openManage}
          onClose={() => setOpenManage(false)}
          title={selectedTitle}
          recruitmentUuid={selectedUuid}
        />
      )}
    </section>
  )
}
