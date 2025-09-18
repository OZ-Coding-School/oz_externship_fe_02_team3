import {
  Calendar as CalendarIcon,
  Users as UsersIcon,
  Coins as CoinsIcon,
  UsersRound as UsersRoundIcon,
} from 'lucide-react'
import type { Post } from '@src/types/post'

interface BannerInfoBoxsProps {
  post: Post
}

export function BannerInfoBoxs({ post }: BannerInfoBoxsProps) {
  // 마감일 형식에 맞게 데이터 수정
  const date = new Date(post.deadline)
  const postDeadline = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)

  const iconClass = 'h-6 w-6 text-gray-700'
  const stats = [
    {
      icon: <UsersRoundIcon className={iconClass} />,
      label: '모집인원',
      value: `${post.recruit_count}명`,
    },
    {
      icon: <CoinsIcon className={iconClass} />,
      label: '예상 비용',
      value: `${post.cost}원`,
    },
    {
      icon: <CalendarIcon className={iconClass} />,
      label: '마감일',
      value: postDeadline,
    },
    {
      icon: <UsersIcon className={iconClass} />,
      label: '스터디 그룹',
      value: post.title,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center rounded-lg bg-gray-50 p-4 transition"
        >
          {stat.icon}
          <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
          <h5 className="mt-1 line-clamp-1 text-lg font-semibold">
            {stat.value}
          </h5>
        </div>
      ))}
    </div>
  )
}
