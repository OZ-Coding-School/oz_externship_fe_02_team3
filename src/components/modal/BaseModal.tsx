import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

// 모달 타입 정의
type BaseModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  size?: 'vertical' | 'horizontal' // 'vertical' = 672px, 'horizontal' = 896px 피그마 참조
  dismissByOverlay?: boolean
}

export default function BaseModal({
  open,
  onClose,
  children,
  size = 'vertical',
  dismissByOverlay = true,
}: BaseModalProps) {
  if (typeof document === 'undefined') return null
  const root = getOrCreateRoot()

  //   닫기
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  //   스크롤 방지
  useEffect(() => {
    if (!open) return
    lockScroll()
    return () => unlockScroll()
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (!dismissByOverlay) return
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className={`relative w-[92%] ${
          size === 'horizontal' ? 'max-w-[896px]' : 'max-w-[672px]'
        } rounded-[12px] bg-white p-6 shadow-2xl`}
      >
        {children}
      </div>
    </div>,
    root
  )
}

// 동적인 DOM 관리
function getOrCreateRoot() {
  let el = document.getElementById('modal-root')
  if (!el) {
    el = document.createElement('div')
    el.id = 'modal-root'
    document.body.appendChild(el)
  }
  return el
}

// 모달 open 했을때 스크롤 방지
let _lockCount = 0 //모달 전용
function lockScroll() {
  _lockCount++
  if (_lockCount === 1) {
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.overflow = 'hidden'
    if (gap) document.documentElement.style.paddingRight = `${gap}px`
  }
}

// 스크롤 방지 해지
function unlockScroll() {
  _lockCount = Math.max(0, _lockCount - 1)
  if (_lockCount === 0) {
    document.documentElement.style.overflow = ''
    document.documentElement.style.paddingRight = ''
  }
}
