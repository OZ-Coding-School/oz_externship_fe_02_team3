import { useState } from 'react'
import BaseModal from './BaseModal'
import ModalHeader from './ModalHeader'
import ModalFooter from './ModalFooter'

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

      <BaseModal open={open} onClose={() => setOpen(false)} size="horizontal">
        <div className="text-center">
          <ModalHeader
            title="지원 현황 관리"
            subTitle="총 Node.js 백엔드 개발 스터디원 구합니다 - 총 3명이 지원했습니다."
            onClose={() => setOpen(false)}
          />
          <div> 메인 내용이 들어갈 공간입니다.</div>
          <ModalFooter
            left={<span>* 표시된 항목은 필수 입력 사항입니다.</span>}
            right={
              <>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded bg-gray-200 px-3 py-2 text-gray-800"
                >
                  취소
                </button>
                <button className="bg-primary-500 rounded px-3 py-2 text-white">
                  지원서 제출
                </button>
              </>
            }
          />
        </div>
      </BaseModal>
    </div>
  )
}
