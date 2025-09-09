import type { ReactNode } from 'react'
import { PORTAL_TARGET_ID } from '@src/constants/portal'
import Portal from '../portal/Portal'
import { type ToastType } from '@src/constants/toast'
import ToastCard from './ToastCard'

interface ToastProps {
  type: ToastType
  title?: string
  children?: ReactNode
  onClose?: () => void
  showBar?: boolean
}

export default function Toast({
  type,
  title,
  children,
  onClose,
  showBar,
}: ToastProps) {
  return (
    <Portal targetId={PORTAL_TARGET_ID.TOAST}>
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed top-4 right-4 z-[1200] flex w-[min(92vw,380px)] flex-col gap-2"
      >
        <ToastCard
          type={type}
          title={title}
          onClose={onClose}
          showBar={showBar}
        >
          {' '}
          {children}
        </ToastCard>
      </div>
    </Portal>
  )
}
