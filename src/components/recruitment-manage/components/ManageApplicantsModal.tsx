import Modal from '@components/commons/modal'
import ApplicantCard from './ApplicantCard'
import type { ApplicationsItem } from '@src/types/applicant'
import { useIntersectionObserver } from '@src/hooks/useIntersectionObserver'
import LoadingSpinner from '@src/components/commons/LoadingSpinner'
import { EmptyState } from '@src/components/commons/EmptyState'
import { useState } from 'react'
import ApplicantDetailModal from './ApplicantDetailModal'
import { approveApplication, rejectApplication } from '@src/api/application'
import { useToast } from '@src/components/commons/toast'
import type { AxiosError } from 'axios'
import { useApplications } from '@src/hooks/useApplications'

interface ManageApplicantsModalProps {
  open: boolean
  onClose: () => void
  title?: string // 공고 제목
<<<<<<< HEAD
  applicants: Applicant[] // 목록 데이터 (추후 API)
  totalCount?: number
  onOpenApplicantDetail?: (applicant: Applicant) => void
=======
  recruitmentUuid: string
>>>>>>> 6301f68 (feat: 지원자 관리 모달 API 연동 및 무한스크롤/액션 추가 #209)
}

export default function ManageApplicantsModal({
  open,
  onClose,
  title = '공고 제목',
<<<<<<< HEAD
  applicants,
  totalCount = applicants.length,
  onOpenApplicantDetail,
}: Props) {
=======
  recruitmentUuid,
}: ManageApplicantsModalProps) {
  const toast = useToast()

  // 지원자 목록, 무한스크롤 관리
  const { items, loading, loadingMore, fetchNext, hasNext, setItems } =
    useApplications(recruitmentUuid, open)

  const totalCount = items.length

  // 상세 모달 제어
  const [openDetail, setOpenDetail] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // 카드 클릭 시 상세 모달 오픈
  const handleCardClick = (item: ApplicationsItem) => {
    setSelectedId(item.application_id)
    setOpenDetail(true)
  }

  // 로컬 목록 상태 패치 (승인/거절 시 즉시 반영)
  const patchLocalStatus = (id: number, next: 'APPROVED' | 'REJECTED') => {
    setItems((prev) =>
      prev.map((it) =>
        it.application_id === id ? { ...it, status: next } : it
      )
    )
  }

  // 지원자 거절, 승인 핸들러
  const handleAction = async (id: number, action: 'APPROVED' | 'REJECTED') => {
    try {
      if (action === 'APPROVED') {
        await approveApplication(id)
        toast.success({
          title: '승인 완료',
          content: '승인이 완료 되었습니다.',
        })
      } else {
        await rejectApplication(id)
        toast.success({
          title: '거절 완료',
          content: '거절이 완료 되었습니다.',
        })
      }
      patchLocalStatus(id, action)
      setOpenDetail(false)
    } catch (e) {
      const err = e as AxiosError<{ detail?: string }>
      toast.error({
        title: action === 'APPROVED' ? '승인 실패' : '거절 실패',
        content:
          err.response?.data?.detail ??
          (action === 'APPROVED'
            ? '승인 처리에 실패했습니다.'
            : '거절 처리에 실패했습니다.'),
      })
    }
  }

  // 무한스크롤 옵저버
  const loadMoreRef = useIntersectionObserver({
    enabled: open,
    hasNextPage: hasNext,
    isFetchingNextPage: loadingMore,
    onIntersect: fetchNext,
    threshold: 0.5,
  })

>>>>>>> 6301f68 (feat: 지원자 관리 모달 API 연동 및 무한스크롤/액션 추가 #209)
  return (
    <Modal open={open} onClose={onClose} size="lg">
      <Modal.Header onClose={onClose}>
        <h2 className="truncate text-xl font-semibold text-gray-900">
          지원 현황 관리
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {title} · 총 {totalCount}명
        </p>
      </Modal.Header>
      <div className="max-h-[80vh] flex-1 overflow-y-auto px-6 py-4">
        {loading ? (
          <LoadingSpinner
            message="지원자 불러오는 중..."
            className="bg-white"
          />
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
<<<<<<< HEAD
            {applicants.map((a) => (
              <ApplicantCard
                key={a.id}
                data={a}
                onClick={onOpenApplicantDetail}
=======
            {items.map((a) => (
              <ApplicantCard
                key={a.application_id}
                data={a}
                onClick={handleCardClick}
>>>>>>> 6301f68 (feat: 지원자 관리 모달 API 연동 및 무한스크롤/액션 추가 #209)
              />
            ))}
            {/* 무한 스크롤 트리거 */}
            {hasNext && <div ref={loadMoreRef} className="h-4" />}
          </div>
        ) : (
          <EmptyState
            title="지원자가 없습니다."
            titleClassName="text-gray-600"
            iconSize="xl"
            iconClassName="mb-2 text-gray-400"
            iconType="APPLICATION"
          />
        )}

        {loadingMore && (
          <LoadingSpinner
            message="추가 지원자 불러오는 중..."
            className="bg-white"
          />
        )}
      </div>
      {openDetail && selectedId !== null && (
        <ApplicantDetailModal
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          title="지원자 상세 정보"
          applicationId={selectedId}
          onAction={handleAction}
        />
      )}
    </Modal>
  )
}
