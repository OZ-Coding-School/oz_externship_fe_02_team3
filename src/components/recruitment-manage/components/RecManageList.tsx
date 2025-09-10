import JobPostCard from '@components/commons/JobPostCard'
import { useNavigate } from 'react-router-dom'
import { jobPosts } from '@mock/jobPosts'
import { EmptyState } from '@src/components/commons/EmptyState'
import { EMPTY_MESSAGES } from '@src/constants/ui'

type CardProps = Parameters<typeof JobPostCard>[0]

export default function RecManageList() {
  const navigate = useNavigate()

  const items: CardProps[] = jobPosts.map((post) => ({
    post: {
      ...post,
      image: post.image,
    },
    editTo: `/recruitment/${post.id}/edit`,
    applyLabel: '지원 내역',
    onClickApply: () => navigate(`/recruitment/create`),
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
    </section>
  )
}
