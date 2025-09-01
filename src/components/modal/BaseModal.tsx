import { useEffect, type ReactNode } from 'react'

// 모달 타입 정의
type BaseModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  maxWidth?: number | string
  dismissByOverlay?: boolean
}

export default function BaseModal({
  open,
  onClose,
  children,
  maxWidth = 640,
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

  return <>{/* 나중에 모달 내용 들어갈 자리 */}</>
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
function unlockScroll() {
  _lockCount = Math.max(0, _lockCount - 1)
  if (_lockCount === 0) {
    document.documentElement.style.overflow = ''
    document.documentElement.style.paddingRight = ''
  }
}
