import { post } from '@src/mock/post'
import {
  Bookmark as BookmarkIcon,
  Calendar as CalendarIcon,
  Eye as ViewIcon,
  User as UserIcon,
} from 'lucide-react'
import { BannerInfoList } from './BannerInfoList'
import { BannerTags } from './BannerTags'
import { BannerButtons } from './BannerButtons'
import { BannerInfoBoxs } from './BannerInfoBoxs'
import { useState } from 'react'
import ApplicationModal from '@src/components/recruitment-manage/application/ApplicationModal'
import { useToast } from '@src/components/commons/toast'

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

  const toast = useToast()
  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success({
          title: 'URL이 클립보드에 복사되었습니다.',
          content: '원하는 곳에 붙여넣기하여 페이지를 공유할 수 있습니다.',
        })
      })
      .catch(() => {
        toast.warning({
          title: 'URL 복사에 실패했습니다.',
          content: '클립보드 접근 권한을 확인하고 다시 시도해주세요.',
        })
      })
  }

  const handleBookmark = () => {
    // 북마크 로직
  }

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-8">
      <div className="flex items-start justify-between pb-6">
        <div className="flex flex-col gap-4">
          <h2 className="line-clamp-1 text-3xl font-bold">{post.title}</h2>
          <BannerInfoList items={jobInfo} />
          <BannerTags tags={post.tags} />
        </div>
        <BannerButtons
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
        recruitmentUuid={String(post.uuid ?? post.id)}
      />
    </div>
  )
}
