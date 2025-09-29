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
import { useEffect, useState } from 'react'
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

/** 간단 확인 모달 */
function ConfirmModal({
  open,
  title,
  description,
  confirmText = '삭제',
  cancelText = '취소',
  onConfirm,
  onClose,
  loading,
}: {
  open: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onClose: () => void
  loading?: boolean
}) {
  // ESC로 닫기
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="inline-flex h-9 items-center rounded-md border border-gray-300 px-4 text-sm hover:bg-gray-50 disabled:opacity-60"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex h-9 items-center rounded-md bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? '삭제 중…' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
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
  const [confirmOpen, setConfirmOpen] = useState(false)

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

  const askDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setConfirmOpen(true)
  }

  const handleDelete = async () => {
    if (deleting) return
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

      setConfirmOpen(false)
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
    <>
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
                      onClick={askDelete}
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
                <Icon
                  icon={CalendarIcon}
                  size="sm"
                  className="stroke-gray-400"
                />
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

            {/* 태그 + 우측 버튼 */}
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

      {/* 확인 모달 */}
      <ConfirmModal
        open={confirmOpen}
        title="정말 삭제할까요?"
        description="삭제 후에는 되돌릴 수 없어요."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleDelete}
        onClose={() => (!deleting ? setConfirmOpen(false) : null)}
        loading={deleting}
      />
    </>
  )
}
