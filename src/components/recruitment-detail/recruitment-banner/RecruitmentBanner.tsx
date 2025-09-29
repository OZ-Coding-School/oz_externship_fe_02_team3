import {
  Bookmark as BookmarkIcon,
  Calendar as CalendarIcon,
  Eye as ViewIcon,
  User as UserIcon,
} from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@src/components/commons/toast'
import { BannerInfoList } from './BannerInfoList'
import { BannerTags } from './BannerTags'
import { BannerButtons } from './BannerButtons'
import { BannerInfoBoxs, type BannerInfoBoxPost } from './BannerInfoBoxs'
import ApplicationModal from '@src/components/recruitment-manage/application/ApplicationModal'
import type { RecruitmentDetail } from '@src/api/supabase/recDetail.supa'
import type { Tag } from '@src/types/tag'

interface Props {
  post: RecruitmentDetail
  onBookmark: () => void
}

export default function RecruitmentBanner({ post, onBookmark }: Props) {
  const [openApplication, setOpenApplication] = useState(false)
  const toast = useToast()

  const createdAtText =
    post.created_at &&
    new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(post.created_at))

  const jobInfo = [
    { icon: UserIcon, label: '작성자', value: '-' }, // author 닉네임 확장 시 채우기
    { icon: CalendarIcon, label: '등록일', value: createdAtText ?? '-' },
    { icon: ViewIcon, label: '조회', value: post.views_count ?? 0 },
    { icon: BookmarkIcon, label: '북마크', value: post.bookmarks_count ?? 0 },
  ]

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard
      .writeText(url)
      .then(() =>
        toast.success({
          title: 'URL이 복사되었습니다.',
          content: '원하는 곳에 붙여넣어 공유하세요.',
        })
      )
      .catch(() =>
        toast.warning({
          title: 'URL 복사 실패',
          content: '클립보드 권한을 확인해주세요.',
        })
      )
  }

  const tagObjs: Tag[] = (post.tags ?? []).map((name, i) => ({
    id: -1000 - i,
    name,
  }))

  const bannerPost: BannerInfoBoxPost = {
    expected_headcount: post.expected_headcount ?? null,
    estimated_fee: post.estimated_fee ?? null,
    close_at: post.close_at ?? null,
    study_group_name: post.study_group_name ?? null,
  }

  const recruitmentUuid = String(post.uuid)

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-8">
      <div className="flex items-start justify-between pb-6">
        <div className="flex flex-col gap-4">
          <h2 className="line-clamp-1 text-3xl font-bold">{post.title}</h2>
          <BannerInfoList items={jobInfo} />
          <BannerTags tags={tagObjs} />
        </div>

        <BannerButtons
          onShare={handleShare}
          onBookmark={onBookmark}
          onClick={() => setOpenApplication(true)}
        />
      </div>

      <BannerInfoBoxs post={bannerPost} />

      <ApplicationModal
        open={openApplication}
        onClose={() => setOpenApplication(false)}
        title={post.title}
        recruitmentUuid={recruitmentUuid}
      />
    </div>
  )
}
