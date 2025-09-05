import { X as CloseIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface ModalHeaderProps {
  children: ReactNode
  onClose?: () => void
}

export default function ModalHeader({ children, onClose }: ModalHeaderProps) {
  return (
    <header className="flex w-full items-center justify-between gap-4 border-b border-gray-300 px-6 py-4">
      <div className="flex min-w-0 flex-col items-start">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="cursor-pointer text-gray-400 hover:text-gray-900"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      )}
    </header>
  )
}
