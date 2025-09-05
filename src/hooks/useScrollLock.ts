import { lockScroll, unlockScroll } from '@src/utils/scrollLock'
import { useEffect } from 'react'

export const useScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) return
    lockScroll()
    return () => {
      unlockScroll()
    }
  }, [active])
}
