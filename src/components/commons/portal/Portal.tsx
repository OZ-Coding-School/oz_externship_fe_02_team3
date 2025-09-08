import type { PortalTargetId } from '@src/constants/portal'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
  targetId: PortalTargetId
}

export default function Portal({ children, targetId }: PortalProps) {
  const root = document.getElementById(targetId)
  if (!root) {
    if (import.meta.env.DEV) {
      console.warn(`Portal target #${targetId}가 index.html 존재하지 않습니다.`)
    }
    return null
  }

  return createPortal(children, root)
}
