import { PORTAL_TARGET_ID } from '@src/constants/portal'
import { useScrollLock } from '@src/hooks/useScrollLock'
import { AnimatePresence, motion } from 'framer-motion'
import Portal from '../portal/Portal'
import { useEffect, type ReactNode } from 'react'
import { cn } from '@src/utils/cn'
import { modalPanel } from '@src/styles/modal'
import {
  ANIMATIONS,
  speedToTransition,
  type AnimationKey,
  type Speed,
} from '@src/constants/animations'

interface ModalProps {
  open: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
  animation?: AnimationKey
  speed?: Speed
  closeOnOutsideClick?: boolean
}

export default function ModalRoot({
  open,
  onClose,
  size = 'md',
  children,
  className,
  speed = 'slow',
  closeOnOutsideClick = true,
}: ModalProps) {
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <Portal targetId={PORTAL_TARGET_ID.OVERLAY}>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[1000]">
            <motion.div
              className="absolute inset-0 bg-black/40"
              {...ANIMATIONS.fade}
              transition={speedToTransition[speed]}
              onClick={() => {
                if (!closeOnOutsideClick) return
                onClose()
              }}
            />
            <motion.div
              className={cn(modalPanel({ size }), className)}
              role="dialog"
              aria-modal="true"
              {...ANIMATIONS.scaleUp}
              transition={speedToTransition[speed]}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  )
}
