import Modal from '@components/commons/modal'
import ApplicantCard, { type Applicant } from './ApplicantCard'

interface Props {
  open: boolean
  onClose: () => void
  title?: string // 공고 제목
  applicants: Applicant[] // 목록 데이터 (추후 API)
  totalCount?: number
}

export default function ManageApplicantsModal({
  open,
  onClose,
  title = '공고 제목',
  applicants,
  totalCount = applicants.length,
}: Props) {
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

      <div className="max-h-[80vh] min-h-0 flex-1 overflow-y-auto px-6 py-4">
        {applicants && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {applicants.map((a) => (
              <ApplicantCard key={a.id} data={a} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}
