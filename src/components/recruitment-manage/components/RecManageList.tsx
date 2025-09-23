import JobPostCard from '@components/commons/JobPostCard'
import { jobPosts } from '@mock/jobPosts'
import { EmptyState } from '@src/components/commons/EmptyState'
import { EMPTY_MESSAGES } from '@src/constants/ui'
import { useState } from 'react'
import ManageApplicantsModal from './ManageApplicantsModal'
import { dummyApplicants } from '@src/mock/applicants'

type CardProps = Parameters<typeof JobPostCard>[0]

export default function RecManageList() {
  const [open, setOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  const handleOpenApplicants = (postId: number) => {
    setSelectedPostId(postId)
    setOpen(true)
  }

  const items: CardProps[] = jobPosts.map((post) => ({
    post: {
      ...post,
      image: post.image,
    },
    editTo: `/recruitment/${post.id}/edit`,
    applyLabel: '지원 내역',
    onClickApply: () => handleOpenApplicants(post.id),
  }))

  return (
    <section>
      <p className="mb-6 text-[20px] leading-7 font-semibold">
        내 공고 목록 (4)
      </p>

      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="rounded-lg bg-white">
            <JobPostCard {...item} />
          </li>
        ))}
        {/* 데이터가 없을 때의 상태 */}
        <EmptyState
          title={EMPTY_MESSAGES.NoData}
          description="새로운 공고가 등록되면 이곳에 표시됩니다."
          iconType="NoData"
          iconClassName="stroke-primary-500 w-8 h-8"
          iconContainerClassName="bg-primary-50 rounded-full w-20 h-20 flex items-center justify-center"
        />
      </ul>
      {selectedPostId !== null && (
        <ManageApplicantsModal
          open={open}
          onClose={() => setOpen(false)}
          title={
            jobPosts.find((p) => p.id === selectedPostId)?.title ?? '공고 제목'
          }
          applicants={dummyApplicants} // 목데이터 or API 호출 결과
        />
      )}
    </section>
  )
}
