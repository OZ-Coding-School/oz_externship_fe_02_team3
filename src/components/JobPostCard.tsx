import { Bookmark, Calendar, Eye, UsersRound } from 'lucide-react'
import Badge from './Badge'
import Icon from './Icon'
import type { JobPost } from '@src/data/jobPosts'

interface JobPostCardProps {
  post: JobPost
}

export default function JobPostCard({ post }: JobPostCardProps) {
  if (!post) return null

  const {
    title,
    viewCount,
    commentCount,
    memberLimit,
    deadline,
    courses,
    tags,
    image,
  } = post

  return (
    <div className="flex h-full gap-4 rounded-lg border border-solid border-gray-200 bg-white p-[25px]">
      <img
        src={image}
        alt={title}
        className="h-24 w-32 rounded-lg bg-cover bg-center bg-no-repeat"
      />
      <div className="flex w-full flex-col">
        {/* 제목과 조회수, 북마크 수 */}
        <div className="flex w-full justify-between pb-3">
          <p className="line-clamp-2 text-lg font-semibold text-gray-900">
            {title}
          </p>
          <div className="text ml-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Icon icon={Eye} size="sm" className="stroke-gray-500" />
              <p className="text-sm text-gray-500">{viewCount}</p>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon={Bookmark} size="sm" className="stroke-gray-500" />
              <p className="text-sm text-gray-500">{commentCount}</p>
            </div>
          </div>
        </div>

        {/* 모집인원, 마감일 */}
        <div className="flex flex-col gap-3 pb-4">
          <div className="flex items-center gap-2">
            <Icon icon={UsersRound} size="sm" className="stroke-gray-400" />
            <p className="text-sm text-gray-600">모집 인원: {memberLimit}명</p>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon={Calendar} size="sm" className="stroke-gray-400" />
            <p className="text-sm text-gray-600">마감일: {deadline}</p>
          </div>
        </div>

        {/* 강의 목록 */}
        <div className="flex flex-col gap-2 pb-4">
          <p className="text-sm text-gray-600">강의 목록:</p>
          <div className="flex flex-col gap-1">
            {courses.map((course, idx) => (
              <div key={idx} className="flex items-center">
                <p className="text-sm text-gray-700">• {course}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 강의 태그 */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <Badge
              badgeTitle={tag}
              key={idx}
              sideClass="bg-primary-100 text-primary-800"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
