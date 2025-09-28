import { Eye, Bookmark, Pencil, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { supa } from '@src/lib/supabase'
import { useToast } from '@components/commons/toast'

export interface MobileJobPostCardProps {
  post: {
    id: number
    uuid?: string
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
  canDelete?: boolean
  onDeleted?: (uuid: string) => void
  applyLabel?: string
  onClickApply?: () => void
}

interface ErrWithMsg {
  message?: unknown
  error_description?: unknown
}
const toErrorMessage = (e: unknown): string => {
  if (typeof e === 'string') return e
  if (e && typeof e === 'object') {
    const { message, error_description } = e as ErrWithMsg
    if (typeof message === 'string') return message
    if (typeof error_description === 'string') return error_description
  }
  return '알 수 없는 오류'
}

export default function MobileJobPostCard({
  post,
  editTo,
  canDelete = false,
  onDeleted,
  applyLabel = '지원 내역',
  onClickApply,
}: MobileJobPostCardProps) {
  const {
    uuid,
    title,
    viewCount,
    bookmarkCount,
    memberLimit,
    deadline,
    courses,
    tags,
    image,
  } = post
  const toast = useToast()
  const [deleting, setDeleting] = useState(false)

  const top3Courses = useMemo(() => courses.slice(0, 3), [courses])
  const remainCnt = Math.max(0, courses.length - top3Courses.length)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!uuid || deleting) return
    if (!window.confirm('공고를 삭제할까요?')) return
    try {
      setDeleting(true)
      const { data: rec, error: e1 } = await supa
        .from('recruitments')
        .select('id')
        .eq('uuid', uuid)
        .single()
      if (e1) throw e1
      const recId = rec?.id as number
      const delChild = async (table: string) => {
        const { error } = await supa
          .from(table)
          .delete()
          .eq('recruitment_id', recId)
        if (error) throw error
      }
      await delChild('recruitment_attachments')
      await delChild('recruitment_images')
      await delChild('recruitment_tags')
      await delChild('recruitment_bookmarks')
      await delChild('applications')
      const { error: eDel } = await supa
        .from('recruitments')
        .delete()
        .eq('id', recId)
      if (eDel) throw eDel
      toast.success({ title: '삭제 완료', content: '공고가 삭제되었습니다.' })
      onDeleted?.(uuid)
    } catch (err: unknown) {
      toast.error({ title: '삭제 실패', content: toErrorMessage(err) })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <article className="rounded-xl bg-white p-3 ring-1 ring-gray-200">
      {/* 제목 + 액션(수정/삭제) */}
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="line-clamp-2 flex-1 pr-2 text-[15px] font-semibold text-gray-900">
          {title}
        </h3>

        <div className="flex shrink-0 items-center gap-1.5">
          {editTo && (
            <Link
              to={editTo}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-50"
              aria-label="공고 수정"
              title="수정"
            >
              <Pencil className="h-5 w-5" />
            </Link>
          )}
          {canDelete && uuid && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              aria-label="공고 삭제"
              title="삭제"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-red-50 disabled:opacity-60"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* 통계 */}
      <div className="mb-2 flex items-center gap-3 text-[12px] text-gray-600">
        <span className="inline-flex items-center gap-1">
          <Eye className="h-4 w-4" /> {viewCount}
        </span>
        <span className="inline-flex items-center gap-1">
          <Bookmark className="h-4 w-4" /> {bookmarkCount}
        </span>
      </div>

      {/* 이미지 (높이 축소) */}
      <div className="overflow-hidden rounded-lg">
        <img
          src={image}
          alt=""
          className="h-28 w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* 메타 2열 카드 (패딩 축소) */}
      <div className="mt-2 grid grid-cols-2 gap-2 text-[13px] text-gray-800">
        <div className="rounded-md bg-gray-50 px-2.5 py-1.5">
          <p className="text-[11px] text-gray-500">모집 인원</p>
          <p className="font-medium">{memberLimit}명</p>
        </div>
        <div className="rounded-md bg-gray-50 px-2.5 py-1.5">
          <p className="text-[11px] text-gray-500">마감일</p>
          <p className="font-medium">{deadline}</p>
        </div>
      </div>

      {/* 강의 목록 (3개만, 나머지 개수 표시) */}
      {top3Courses.length > 0 && (
        <div className="mt-2">
          <p className="mb-1 text-[12px] font-medium text-gray-700">
            강의 목록
          </p>
          <ul className="list-disc space-y-0.5 pl-4 text-[13px] text-gray-700 marker:text-gray-400">
            {top3Courses.map((c, i) => (
              <li key={i} className="break-words">
                {c}
              </li>
            ))}
            {remainCnt > 0 && (
              <li className="text-gray-500">외 {remainCnt}건</li>
            )}
          </ul>
        </div>
      )}

      {/* 태그 (간격 축소) */}
      {tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="rounded-md bg-yellow-100 px-1.5 py-0.5 text-[11px] font-medium text-yellow-800"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* 지원 버튼 (높이/패딩 축소) */}
      {onClickApply && (
        <div className="mt-3">
          <button
            type="button"
            onClick={onClickApply}
            className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-blue-500 px-3 text-[13px] font-semibold text-white hover:bg-blue-700 active:bg-blue-900"
          >
            {applyLabel}
          </button>
        </div>
      )}
    </article>
  )
}
