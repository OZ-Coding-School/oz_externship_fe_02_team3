import { useParams } from 'react-router-dom'
import { jobPosts } from '@src/mock/jobPosts'
import type { JobPost } from '@src/types/jobPosts'
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
  const { id } = useParams<{ id: string }>()
  const jobId = Number(id)

  const job: JobPost | undefined = jobPosts.find((post) => post.id === jobId)
  const exJob = {
    name: '박유니티',
    date: '등록일: 2024년 11월 22일 오후 06:00',
  }

  if (!job) {
    return <div>해당 공고를 찾을 수 없습니다.</div>
  }

  const jobInfo = [
    { icon: UserIcon, label: '작성자', value: exJob.name },
    { icon: CalendarIcon, label: '등록일', value: exJob.date },
    { icon: ViewIcon, label: '조회', value: job.viewCount },
    { icon: BookmarkIcon, label: '북마크', value: job.commentCount },
  ]

  const handleBookmark = () => {
    // 북마크 로직
  }

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-8">
      <div className="flex items-start justify-between pb-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{job.title}</h2>
          <BannerInfoList items={jobInfo} />
          <BannerTags tags={job.tags} />
        </div>
        <BannerButtens
          onBookmark={handleBookmark}
          onClick={() => setOpenApplication(true)}
        />
      </div>
      <BannerInfoBoxs job={job} />

      <ApplicationModal
        open={openApplication}
        onClose={() => setOpenApplication(false)}
        title="Unity 게임 개발 프로젝트 팀원 모집"
      />
    </div>
  )
}
