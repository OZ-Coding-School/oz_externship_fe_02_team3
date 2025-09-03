import ApplicationModal from '@src/components/recruitment/application/ApplicationModal'
import ManageApplicantsModal from '@src/components/recruitment/manage/ManageApplicantsModal'
import { dummyApplicants } from '@src/data/applicants'
import { useState } from 'react'

// 팀 규칙: 선언식 + default export
export default function TestApplicationModalPage() {
  const [openApplication, setOpenApplication] = useState(false)
  const [openManage, setOpenManage] = useState(false)

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
    </div>
  )
}
