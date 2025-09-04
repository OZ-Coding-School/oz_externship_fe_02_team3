import {
  Bookmark,
  Calendar,
  Eye,
  FileText,
  Pencil,
  UsersRound,
} from 'lucide-react'
import Badge from './Badge'
import Icon from './Icon'
import { Link } from 'react-router-dom'

interface JobPostCardProps {
  postTitle: string
  viewCount: number
  commentCount: number
  memberLimit: number
  deadline: string
  courses: string[]
  tags: string[]
  image?: string
  applyLabel?: string
  onClickApply?: () => void
  editTo?: string
}

const JobPostCard = ({
  postTitle,
  viewCount,
  commentCount,
  memberLimit,
  deadline,
  courses,
  tags,
  image,
  applyLabel,
  onClickApply,
  editTo,
}: JobPostCardProps) => {
  return (
    <div className="flex gap-4 rounded-lg border border-solid border-gray-200 p-[25px]">
      <div
        className="h-24 w-32 rounded-lg bg-gray-100 bg-cover bg-center bg-no-repeat"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      />
      <div className="flex w-full flex-col">
        {/* 제목과 조회수, 북마크 수 */}
        <div className="flex w-full justify-between pb-3">
          <p className="text-lg">{postTitle}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Icon icon={Eye} size="sm" className="stroke-gray-500" />
              <p className="text-sm text-gray-500">{viewCount}</p>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon={Bookmark} size="sm" className="stroke-gray-500" />
              <p className="text-sm text-gray-500">{commentCount}</p>
            </div>
            {editTo && (
              <span>
                <Link
                  to={editTo}
                  className="inline-flex h-7 w-7 items-center justify-center gap-1 rounded-full hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                >
                  <Pencil size={16} className="stroke-gray-500" />
                </Link>
              </span>
            )}
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

        {/* 강의 목록*/}
        <div className="flex flex-col gap-2 pb-4">
          <p className="text-sm text-gray-600">강의 목록:</p>
          <div className="flex flex-col gap-1">
            {courses.map((course, courseIndex) => (
              <div key={courseIndex} className="flex items-center">
                <p className="text-sm text-gray-700">• {course}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 강의 태그 */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, tagIndex) => (
            <Badge
              badgeTitle={tag}
              key={tagIndex}
              sideClass="bg-primary-100 text-primary-800"
            />
          ))}
        </div>

        {/* 하단 우측 버튼 */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClickApply}
            className="inline-flex h-9 cursor-pointer items-center rounded-md bg-[#3B82F6] px-6 py-5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Icon icon={FileText} size="sm" className="stroke-white" />
            <p className="pl-2.5">{applyLabel}</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobPostCard
