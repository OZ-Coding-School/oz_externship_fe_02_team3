import ApplicationModal from '@src/components/recruitment/application/ApplicationModal'
import { useState } from 'react'

export default function TestApplicationModalPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-8">
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        지원서 작성 모달 열기
      </button>

      <ApplicationModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
