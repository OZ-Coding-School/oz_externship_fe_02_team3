import {
  Bookmark as BookmarkIcon,
  Calendar as CalendarIcon,
  Eye as ViewCountIcon,
  UsersRound as UsersRoundIcon,
  FileText as FileTextIcon,
  Pencil as PencilIcon,
  X as XIcon,
} from 'lucide-react'
import Badge from './Badge'
import Icon from './Icon'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@src/constants/routes'
import type { JobPost } from '@src/types/jobPosts'
import {
  makeEditDraftFromPost,
  type JobPostForEdit,
} from '@src/utils/makeEditDraftFromPost'
import { useState } from 'react'
import { supa } from '@src/lib/supabase'
import { useToast } from '@components/commons/toast'

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

interface JobPostCardProps {
  post: JobPost
  applyLabel?: string
  onClickApply?: () => void
  editTo?: string

  canDelete?: boolean
  onDeleted?: (uuid: string) => void
}

export default function JobPostCard({
  post,
  applyLabel,
  onClickApply,
  editTo,
  canDelete = false,
  onDeleted,
}: JobPostCardProps) {
  const NAVIGATE = useNavigate()
  const toast = useToast()
  const [deleting, setDeleting] = useState(false)

  if (!post) return null

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

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (deleting) return

    const ok = window.confirm(
      '정말 이 공고를 삭제할까요?\n삭제 후에는 되돌릴 수 없어요.'
    )
    if (!ok) return

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
      toast.error({
        title: '삭제 실패',
        content: toErrorMessage(err),
      })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Link to={ROUTES.RECRUITMENT_UUID(uuid)}>
      <div className="hover:bg-primary-50/60 flex h-full gap-4 rounded-lg border border-solid border-gray-200 bg-white p-[25px] transition-colors duration-300">
        <img
          src={image || 'https://placehold.co/320x240/e5e7eb/e5e7eb.png'}
          alt={title}
          className="h-24 w-32 rounded-lg object-cover"
        />

        <div className="flex w-full flex-col">
          {/* 제목과 조회수/북마크 + 편집/삭제 버튼 */}
          <div className="flex w-full items-center justify-between pb-3">
            <p className="line-clamp-2 text-lg font-semibold">{title}</p>

            <div className="ml-2 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Icon
                  icon={ViewCountIcon}
                  size="sm"
                  className="stroke-gray-500"
                />
                <p className="text-sm text-gray-500">{viewCount}</p>
              </div>

              <div className="flex items-center gap-1">
                <Icon
                  icon={BookmarkIcon}
                  size="sm"
                  className="stroke-gray-500"
                />
                <p className="text-sm text-gray-500">{bookmarkCount}</p>

                {/* 편집 버튼 (옵션) */}
                {editTo && (
                  <button
                    type="button"
                    aria-label="스터디 공고 수정"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const draft = makeEditDraftFromPost(
                        post as JobPostForEdit
                      )
                      NAVIGATE(editTo, { state: { draft } })
                    }}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                  >
                    <PencilIcon size={16} className="stroke-gray-500" />
                  </button>
                )}

                {canDelete && (
                  <button
                    type="button"
                    aria-label="스터디 공고 삭제"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none disabled:opacity-60"
                    title="삭제"
                  >
                    <XIcon size={16} className="stroke-gray-500" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 모집인원, 마감일 */}
          <div className="flex flex-col gap-3 pb-4">
            <div className="flex items-center gap-2">
              <Icon
                icon={UsersRoundIcon}
                size="sm"
                className="stroke-gray-400"
              />
              <p className="text-sm text-gray-600">
                모집 인원: {memberLimit}명
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon={CalendarIcon} size="sm" className="stroke-gray-400" />
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
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, tagIndex) => (
                <Badge
                  badgeTitle={tag}
                  key={tagIndex}
                  className="bg-primary-100 text-primary-800"
                />
              ))}
            </div>

            {/* 하단 우측 신청 버튼 (옵션) */}
            {applyLabel && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onClickApply?.()
                  }}
                  className="inline-flex h-9 items-center rounded-md bg-[#3B82F6] px-6 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <Icon
                    icon={FileTextIcon}
                    size="sm"
                    className="stroke-white"
                  />
                  <span className="pl-2.5">{applyLabel}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
