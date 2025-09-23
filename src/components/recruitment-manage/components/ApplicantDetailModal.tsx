import Button from '@src/components/commons/button/Button'
import Modal from '@src/components/commons/modal'
import { Check, X as XIcon } from 'lucide-react'
import ApplicantProfile from './ApplicantProfile'
import type { ApplicantDetail } from '@src/types/applicant'
import DetailSection from './DetailSection'

interface ApplicantDetailModalProps {
  data: ApplicantDetail
  open: boolean
  onClose: () => void
  title: string
}

export default function ApplicantDetailModal({
  data,
  open,
  onClose,
  title = '지원자 상세 모달',
}: ApplicantDetailModalProps) {
  const showActions = data.status !== 'approved'
  return (
    <Modal open={open} onClose={onClose} size="md" closeOnOutsideClick={true}>
      <Modal.Header onClose={onClose}>
        <h2 className="truncate text-xl font-semibold text-gray-900">
          {title}
        </h2>
      </Modal.Header>
      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-4">
        <ApplicantProfile data={data} />
        <DetailSection title="자기소개">{data.intro}</DetailSection>
        <DetailSection title="지원 동기">{data.motive}</DetailSection>
        <DetailSection title="스터디 목표">{data.goal}</DetailSection>
        <DetailSection title="가능한 시간대">{data.availability}</DetailSection>
        {data.hasExp && (
          <DetailSection title="경험 상세">{data.expDetail}</DetailSection>
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
            />
            <Button
              buttonInnerText="승인"
              icon={Check}
              iconSize="sm"
              variant="success"
            />
          </div>
        </Modal.Footer>
      )}
    </Modal>
  )
}
