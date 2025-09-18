import { post } from '@src/mock/post'
import {
  Bookmark as BookmarkIcon,
  Calendar as CalendarIcon,
  Eye as ViewIcon,
  User as UserIcon,
} from 'lucide-react'
import { BannerInfoList } from './BannerInfoList'
import { BannerTags } from './BannerTags'
import { BannerButtens } from './BannerButtens'
import { BannerInfoBoxs } from './BannerInfoBoxs'
import { useState } from 'react'
import ApplicationModal from '@src/components/recruitment-manage/application/ApplicationModal'

export default function RecruitmentBanner() {
  const [openApplication, setOpenApplication] = useState(false)

  // 등록일 형식에 맞게 데이터 수정
  const date = new Date(post.created_at)
  const postCreatedAt = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date)

  const jobInfo = [
    { icon: UserIcon, label: '작성자', value: post.author.nickname },
    { icon: CalendarIcon, label: '등록일', value: postCreatedAt },
    { icon: ViewIcon, label: '조회', value: post.view_count },
    { icon: BookmarkIcon, label: '북마크', value: post.bookmark_count },
  ]

  const handleShare = () => {
    // 공유하기 로직
  }

  const handleBookmark = () => {
    // 북마크 로직
  }

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-8">
      <div className="flex items-start justify-between pb-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{post.title}</h2>
          <BannerInfoList items={jobInfo} />
          <BannerTags tags={post.tags} />
        </div>
        <BannerButtens
          onShare={handleShare}
          onBookmark={handleBookmark}
          onClick={() => setOpenApplication(true)}
        />
      </div>
      <BannerInfoBoxs post={post} />

      <ApplicationModal
        open={openApplication}
        onClose={() => setOpenApplication(false)}
        title="Unity 게임 개발 프로젝트 팀원 모집"
      />
    </div>
  )
}
