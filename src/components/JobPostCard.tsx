import { Bookmark, Calendar, Eye, UsersRound } from 'lucide-react'
import Badge from './Badge'
import Icon from './Icon'

interface JobPostCardProps {
  postTitle: string
  viewCount: number
  commentCount: number
  memberLimit: number
  deadline: string
  courses: string[]
  tags: string[]
  image?: string
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
}: JobPostCardProps) => {
  return (
    <div className="flex gap-4 rounded-lg border border-solid border-gray-200 p-[25px]">
      <div className="h-24 w-32 rounded-lg bg-gray-100 bg-cover bg-center bg-no-repeat" />
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
      </div>
    </div>
  )
}

export default JobPostCard
