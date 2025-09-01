import { useState } from 'react'
import BaseModal from './BaseModal'

export default function TestModal() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-8 text-white">
      <button
        onClick={() => setOpen(true)}
        className="bg-primary-500 rounded px-4 py-2"
      >
        모달 열기
      </button>

      <BaseModal open={open} onClose={() => setOpen(false)}>
        <div className="text-center">
          <h2 className="mb-4 text-xl font-bold">테스트 모달</h2>
          <p className="mb-6 text-gray-300">모달 테스트</p>
          <button
            onClick={() => setOpen(false)}
            className="bg-danger-500 rounded px-4 py-2"
          >
            닫기
          </button>
        </div>
      </BaseModal>
    </div>
  )
}
