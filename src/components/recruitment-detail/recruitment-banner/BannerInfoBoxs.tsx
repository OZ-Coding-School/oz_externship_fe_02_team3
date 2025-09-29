import {
  Calendar as CalendarIcon,
  Users as UsersIcon,
  Coins as CoinsIcon,
  UsersRound as UsersRoundIcon,
} from 'lucide-react'

export interface BannerInfoBoxPost {
  expected_headcount: number | null
  estimated_fee: number | null
  close_at: string | null
  study_group_name: string | null
}

interface BannerInfoBoxsProps {
  post: BannerInfoBoxPost
}

export function BannerInfoBoxs({ post }: BannerInfoBoxsProps) {
  const headcount = post.expected_headcount ?? 0
  const fee = post.estimated_fee ?? 0
  const deadline = post.close_at
    ? new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(post.close_at))
    : '-'

  const feeText = fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const iconClass = 'h-6 w-6 text-gray-700'
  const stats = [
    {
      icon: <UsersRoundIcon className={iconClass} />,
      label: '모집인원',
      value: `${headcount}명`,
    },
    {
      icon: <CoinsIcon className={iconClass} />,
      label: '예상 비용',
      value: `${feeText}원`,
    },
    {
      icon: <CalendarIcon className={iconClass} />,
      label: '마감일',
      value: deadline,
    },
    {
      icon: <UsersIcon className={iconClass} />,
      label: '스터디 그룹',
      value: post.study_group_name ?? '-',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, idx) => (
        <div
          key={`${stat.label}-${idx}`}
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
