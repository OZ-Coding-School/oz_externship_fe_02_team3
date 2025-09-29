import Button from '@src/components/commons/button/Button'
import Modal from '@src/components/commons/modal'
import { Check, X as XIcon } from 'lucide-react'
import ApplicantProfile from './ApplicantProfile'
import type { ApplicationDetail } from '@src/types/applicant'
import DetailSection from './DetailSection'
import { useToast } from '@src/components/commons/toast'
import { useEffect, useState } from 'react'
import { getApplicationDetail } from '@src/api/application'
import type { AxiosError } from 'axios'
import LoadingSpinner from '@src/components/commons/LoadingSpinner'

interface ApplicantDetailModalProps {
  applicationId: number
  open: boolean
  onClose: () => void
  title: string
  onAction: (id: number, action: 'APPROVED' | 'REJECTED') => void
}

export default function ApplicantDetailModal({
  applicationId,
  open,
  onClose,
  title = '지원자 상세 정보',
  onAction,
}: ApplicantDetailModalProps) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ApplicationDetail | null>(null)

  useEffect(() => {
    if (!open || applicationId == null) return
    let mounted = true
    ;(async () => {
      setLoading(true)
      try {
        const detail = await getApplicationDetail(applicationId)
        if (!mounted) return
        setData(detail)
      } catch (e) {
        const err = e as AxiosError<{ detail?: string }>
        toast.error({
          title: '상세 불러오기 실패',
          content: err.response?.data?.detail ?? '잠시 후 다시 시도해 주세요.',
        })
        setData(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
      // 모달 닫히거나 id가 바뀔 때 이전 데이터 제거 (stale UI 방지)
      setData(null)
    }
  }, [open, applicationId, toast])
  // PENDING 상태일 때만 버튼 노출
  const showActions = data?.status === 'PENDING'

  return (
    <Modal open={open} onClose={onClose} size="md" closeOnOutsideClick={true}>
      <Modal.Header onClose={onClose}>
        <h2 className="truncate text-xl font-semibold text-gray-900">
          {title}
        </h2>
      </Modal.Header>
      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-4">
        {loading ? (
          <LoadingSpinner
            message="상세 정보를 불러오는 중..."
            className="bg-white"
          />
        ) : !data ? (
          <div className="py-10 text-center text-gray-400">
            상세 정보를 불러올 수 없습니다.
          </div>
        ) : (
          <>
            <ApplicantProfile data={data} />
            <DetailSection title="자기소개">{data.introduction}</DetailSection>
            <DetailSection title="지원 동기">{data.motivation}</DetailSection>
            <DetailSection title="스터디 목표">{data.study_goal}</DetailSection>
            <DetailSection title="가능한 시간대">
              {data.available_times}
            </DetailSection>
            {data.has_study_experience && (
              <DetailSection title="경험 상세">
                {data.specific_experience}
              </DetailSection>
            )}
          </>
        )}
      </div>
      {showActions && (
        <Modal.Footer>
          <div className="ml-auto flex items-center gap-2">
            <Button
              buttonInnerText="거절"
              icon={XIcon}
              iconSize="sm"
              variant="danger"
              onClick={() => onAction(applicationId, 'REJECTED')}
            />
            <Button
              buttonInnerText="승인"
              icon={Check}
              iconSize="sm"
              variant="success"
              onClick={() => onAction(applicationId, 'APPROVED')}
            />
          </div>
        </Modal.Footer>
      )}
    </Modal>
  )
}
