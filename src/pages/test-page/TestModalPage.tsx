import { dummyApplicants, dummyApplicants2 } from '@mock/applicants'
import ApplicationModal from '@src/components/recruitment-manage/application/ApplicationModal'
import ApplicantDetailModal from '@src/components/recruitment-manage/components/ApplicantDetailModal'
import ManageApplicantsModal from '@src/components/recruitment-manage/components/ManageApplicantsModal'
import { useState } from 'react'

// 팀 규칙: 선언식 + default export
export default function TestApplicationModalPage() {
  const [openApplication, setOpenApplication] = useState(false)
  const [openManage, setOpenManage] = useState(false)
  const [openApplicationDetail, setOpenApplicationDetail] = useState(false)

  return (
    <div className="space-x-4 p-8">
      <button
        onClick={() => setOpenApplication(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        지원서 작성 모달 열기
      </button>

      <button
        onClick={() => setOpenManage(true)}
        className="rounded bg-green-500 px-4 py-2 text-white"
      >
        지원자 관리 모달 열기
      </button>

      <button
        onClick={() => setOpenApplicationDetail(true)}
        className="bg-danger-500 rounded px-4 py-2 text-white"
      >
        지원자 상세 정보
      </button>

      {/* 지원서 작성 모달 */}
      <ApplicationModal
        open={openApplication}
        onClose={() => setOpenApplication(false)}
        title="Unity 게임 개발 프로젝트 팀원 모집"
      />

      {/* 지원자 관리 모달 */}
      <ManageApplicantsModal
        open={openManage}
        onClose={() => setOpenManage(false)}
        title="Unity 게임 개발 프로젝트 팀원 모집"
        applicants={dummyApplicants}
      />
      {/* 지원자 관리 모달 */}
      <ApplicantDetailModal
        open={openApplicationDetail}
        onClose={() => setOpenApplicationDetail(false)}
        title="지원자 상세 정보"
        data={dummyApplicants2[1]}
      />
    </div>
  )
}
