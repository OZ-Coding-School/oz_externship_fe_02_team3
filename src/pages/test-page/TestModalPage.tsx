import ApplicationModal from '@src/components/recruitment-manage/application/ApplicationModal'
import { useState } from 'react'

// 팀 규칙: 선언식 + default export
export default function TestApplicationModalPage() {
  const [openApplication, setOpenApplication] = useState(false)

  return (
    <div className="space-x-4 p-8">
      <button
        onClick={() => setOpenApplication(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        지원서 작성 모달 열기
      </button>

      {/* 지원서 작성 모달 */}
      <ApplicationModal
        open={openApplication}
        onClose={() => setOpenApplication(false)}
        title="Unity 게임 개발 프로젝트 팀원 모집"
      />
    </div>
  )
}
