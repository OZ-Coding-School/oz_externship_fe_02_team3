import { useState } from 'react'
import BaseModal from './BaseModal'
import ModalHeader from './ModalHeader'

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
          <ModalHeader
            title="지원 현황 관리"
            subTitle="총 3명이 지원했습니다"
            onClose={() => setOpen(false)}
          />
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
