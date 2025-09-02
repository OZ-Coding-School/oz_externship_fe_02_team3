import { X } from 'lucide-react'

// 모달 헤더 props 타입 정의
type ModalHeaderProps = {
  title: React.ReactNode
  subTitle?: React.ReactNode
  onClose: () => void
}

export default function ModalHeader({
  title,
  subTitle,
  onClose,
}: ModalHeaderProps) {
  const titleId = 'modal-title'
  const subId = subTitle ? 'modal-sub' : undefined

  return (
    // items-center로할지 start로 할지 질문
    <header className="flex w-full items-center justify-between gap-4 border-b border-gray-300 px-6 py-4">
      <div className="flex min-w-0 flex-col items-start">
        <h2
          id={titleId}
          className="truncate text-xl font-semibold text-gray-900"
        >
          {title}
        </h2>
        {subTitle && (
          <p id={subId} className="mt-1 text-sm text-gray-500">
            {subTitle}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        className="cursor-pointer text-gray-400 hover:text-gray-900"
      >
        <X className="h-5 w-5" />
      </button>
    </header>
  )
}
