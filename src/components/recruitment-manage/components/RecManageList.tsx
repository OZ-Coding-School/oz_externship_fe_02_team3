import JobPostCard from '@components/commons/JobPostCard'
import { useNavigate } from 'react-router-dom'
import { jobPosts } from '@mock/jobPosts'

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
      </ul>
    </section>
  )
}
