// src/hooks/useOutsideClick.ts
import { useEffect } from 'react'

interface AnyRef {
  current: Element | null
}

export function useOutsideClick(
  open: boolean,
  refs: AnyRef[],
  onClose: () => void
) {
  useEffect(() => {
    if (!open) return

    const handleDocumentMouseDown = (event: MouseEvent) => {
      const targetNode = event.target as Node

      // 클릭된 노드를 포함하는 '안쪽 ref'를 찾는다
      const insideRef = refs.find((ref) => {
        const element = ref.current
        return element ? element.contains(targetNode) : false
      })

      const clickedOutside = !insideRef
      if (clickedOutside) onClose()
    }
    document.addEventListener('mousedown', handleDocumentMouseDown)
    return () =>
      document.removeEventListener('mousedown', handleDocumentMouseDown)
  }, [open, refs, onClose])
}
