import { Eye, Bookmark, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface MobileJobPostCardProps {
  post: {
    id: number
    title: string
    viewCount: number
    bookmarkCount: number
    memberLimit: number
    deadline: string
    courses: string[]
    tags: string[]
    image: string
  }
  editTo?: string
  applyLabel?: string
  onClickApply?: () => void
}

export default function MobileJobPostCard({
  post,
  editTo,
  applyLabel = '지원 내역',
  onClickApply,
}: MobileJobPostCardProps) {
  const {
    title,
    viewCount,
    bookmarkCount,
    memberLimit,
    deadline,
    courses,
    tags,
    image,
  } = post

  return (
    <article className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
      <div className="flex items-start justify-between gap-2">
        <h3 className="line-clamp-2 flex-1 text-base font-semibold text-gray-900">
          {title}
        </h3>
        {editTo && (
          <Link
            to={editTo}
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-50"
            aria-label="공고 수정"
          >
            <Pencil className="h-5 w-5" />
          </Link>
        )}
      </div>

      <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
        <span className="inline-flex items-center gap-1">
          <Eye className="h-4 w-4" /> {viewCount}
        </span>
        <span className="inline-flex items-center gap-1">
          <Bookmark className="h-4 w-4" /> {bookmarkCount}
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-lg">
        <img
          src={image}
          alt=""
          className="h-40 w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
        <div className="rounded-lg bg-gray-50 px-3 py-2">
          <p className="text-[11px] text-gray-500">모집 인원</p>
          <p className="font-medium">{memberLimit}명</p>
        </div>
        <div className="rounded-lg bg-gray-50 px-3 py-2">
          <p className="text-[11px] text-gray-500">마감일</p>
          <p className="font-medium">{deadline}</p>
        </div>
      </div>

      {courses?.length > 0 && (
        <div className="mt-3">
          <p className="mb-1 text-[12px] font-medium text-gray-700">
            강의 목록
          </p>
          <ul className="list-disc space-y-1 pl-5 text-[13px] text-gray-700 marker:text-gray-400">
            {courses.map((c, i) => (
              <li key={i} className="break-words">
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="rounded-md bg-yellow-100 px-2 py-1 text-[11px] font-medium text-yellow-800"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4">
        <button
          type="button"
          onClick={onClickApply}
          className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-500 px-3 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-900"
        >
          {applyLabel}
        </button>
      </div>
    </article>
  )
}
