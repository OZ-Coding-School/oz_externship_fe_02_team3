import { useCallback, useRef, useState, type ReactNode } from 'react'
import { PORTAL_TARGET_ID } from '@src/constants/portal'
import Portal from '../portal/Portal'
import {
  TOAST_DEFAULTS,
  TOAST_DURATION_BY_TYPE,
  type ToastType,
} from '@src/constants/toast'
import ToastCard from './ToastCard'
import { AnimatePresence } from 'framer-motion'

interface ToastProps {
  type: ToastType
  title?: string
  children?: ReactNode
  onClose?: () => void
  showBar?: boolean
  durationMs?: number
}

export default function Toast({
  type,
  title,
  children,
  onClose,
  showBar,
  durationMs,
}: ToastProps) {
  const total =
    durationMs ?? TOAST_DURATION_BY_TYPE[type] ?? TOAST_DEFAULTS.durationMs
  const closedRef = useRef(false)

  const [visible, setVisible] = useState(true)

  const requestClose = useCallback(() => {
    if (closedRef.current) return
    closedRef.current = true
    setVisible(false)
  }, [])

  return (
    <Portal targetId={PORTAL_TARGET_ID.TOAST}>
      <div
        role="status"
        aria-live="polite"
        className="group pointer-events-none fixed top-4 right-4 z-[1200] flex w-[min(92vw,380px)] flex-col gap-2"
      >
        <AnimatePresence
          mode="popLayout"
          onExitComplete={() => {
            // exite 에니메이션 끝날떄까지 onClose 안함
            onClose?.()
          }}
        >
          {visible && (
            <ToastCard
              type={type}
              title={title}
              onClose={requestClose}
              showBar={showBar}
              durationMs={total}
              onAutoClose={requestClose}
            >
              {children}
            </ToastCard>
          )}
        </AnimatePresence>
      </div>
    </Portal>
  )
}
