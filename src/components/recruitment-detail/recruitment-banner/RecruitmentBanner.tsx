import {
  Bookmark as BookmarkIcon,
  Calendar as CalendarIcon,
  Eye as ViewIcon,
  User as UserIcon,
} from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@src/components/commons/toast'
import { supa } from '@src/lib/supabase'
import { BannerInfoList } from './BannerInfoList'
import { BannerTags } from './BannerTags'
import { BannerButtons } from './BannerButtons'
import { BannerInfoBoxs, type BannerInfoBoxPost } from './BannerInfoBoxs'
import ApplicationModal from '@src/components/recruitment-manage/application/ApplicationModal'
import type { RecruitmentDetail } from '@src/api/supabase/recDetail.supa'
import type { Tag } from '@src/types/tag'
import { useAuthLight } from '@src/store/authLight'

interface Props {
  post: RecruitmentDetail
  onBookmark?: () => void
}

const toErrorMessage = (e: unknown): string => {
  if (typeof e === 'string') return e
  if (e && typeof e === 'object') {
    const obj = e as Record<string, unknown>
    const msg = obj['message']
    const desc = obj['error_description']
    if (typeof msg === 'string') return msg
    if (typeof desc === 'string') return desc
  }
  return '알 수 없는 오류'
}

export default function RecruitmentBanner({ post, onBookmark }: Props) {
  const [openApplication, setOpenApplication] = useState(false)
  const [bmCount, setBmCount] = useState<number>(post.bookmarks_count ?? 0)
  const [bookmarking, setBookmarking] = useState(false)
  const toast = useToast()

  const ready = useAuthLight((state) => state.ready)
  const loggedIn = useAuthLight((state) => state.loggedIn)

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

  const handleBookmark = async () => {
    if (bookmarking) return

    if (!ready) {
      toast.warning({
        title: '기다려주세요',
        content: '로그인 상태 확인 중입니다. 잠시 후 다시 시도해주세요.',
      })
      return
    }

    if (!loggedIn) {
      toast.error({
        title: '로그인이 필요합니다',
        content: '북마크 기능을 이용하려면 먼저 로그인해주세요.',
      })
      return
    }

    try {
      setBookmarking(true)
      const { error } = await supa.rpc('inc_recruitment_bookmarks', {
        p_uuid: post.uuid,
      })
      if (error) throw error
      setBmCount((c) => c + 1)
      toast.success({ title: '북마크에 추가되었습니다' })
      onBookmark?.()
    } catch (err) {
      toast.error({ title: '북마크 실패', content: toErrorMessage(err) })
    } finally {
      setBookmarking(false)
    }
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

  const jobInfo = [
    { icon: UserIcon, label: '작성자', value: '-' }, // author 닉네임 확장 시 채우기
    { icon: CalendarIcon, label: '등록일', value: createdAtText ?? '-' },
    { icon: ViewIcon, label: '조회', value: post.views_count ?? 0 },
    { icon: BookmarkIcon, label: '북마크', value: bmCount },
  ]

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
          onBookmark={handleBookmark}
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
