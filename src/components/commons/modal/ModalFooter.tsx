import type { ReactNode } from 'react'

interface ModalFooterProps {
  children: ReactNode
}

export default function ModalFooter({ children }: ModalFooterProps) {
  return (
    <footer className="mt-4 flex items-center justify-between gap-4 border-t border-gray-300 px-6 py-4">
      {children}
    </footer>
  )
}
