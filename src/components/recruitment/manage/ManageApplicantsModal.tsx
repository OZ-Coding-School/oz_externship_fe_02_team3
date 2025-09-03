import type { Applicant } from './ApplicantCard'
import BaseModal from '@src/components/modal/BaseModal'
import ModalHeader from '@src/components/modal/ModalHeader'
import ApplicantCard from './ApplicantCard'

interface Props {
  open: boolean
  onClose: () => void
  title?: string // 공고 제목
  applicants: Applicant[] // 목록 데이터 더미 -> 추후 API 연결
  totalCount?: number
}

export default function ManageApplicantsModal({
  open,
  onClose,
  title = '공고 제목',
  applicants,
  totalCount = applicants.length,
}: Props) {
  //   const [selectedId, setSelectedId] = useState<Applicant['id'] | null>(null)
  if (!open) return null
  return (
    <BaseModal open={open} onClose={onClose} size="horizontal">
      <div className="flex max-h-[80vh] flex-col">
        <ModalHeader
          title="지원 현황 관리"
          subTitle={`${title} · 총 ${totalCount}명`}
          onClose={onClose}
        />

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          {applicants.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:[grid-template-columns:repeat(auto-fill,minmax(416px,1fr))]">
              {applicants.map((a) => (
                <ApplicantCard
                  key={a.id}
                  data={a}
                  //   onClick={(idOrData) => {
                  // const id =
                  // typeof idOrData === 'object' ? idOrData.id : idOrData
                  // setSelectedId(id)
                  // TODO : 상세 모달 open
                  //   }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </BaseModal>
  )
}
