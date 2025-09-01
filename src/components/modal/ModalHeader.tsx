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
    <header className="flex items-start justify-between gap-4 pb-4">
      <div className="min-w-0">
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
      <div className="flex items-center gap-2">
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
