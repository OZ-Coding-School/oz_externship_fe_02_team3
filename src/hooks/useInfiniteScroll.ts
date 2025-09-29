import { useEffect, useRef } from 'react'

interface Args {
  enabled?: boolean
  hasNextPage?: boolean | null
  isFetchingNextPage?: boolean
  onLoadMore: () => void | Promise<void>
  root?: Element | null
  rootMargin?: string
  threshold?: number
}

function getScrollParent(el: Element | null): Element | null {
  let p: Element | null = el?.parentElement ?? null
  while (p) {
    const s = getComputedStyle(p)
    const oy = s.overflowY
    if (oy === 'auto' || oy === 'scroll' || oy === 'overlay') return p
    p = p.parentElement
  }
  return null
}

export function useInfiniteScroll({
  enabled = true,
  hasNextPage = true,
  isFetchingNextPage = false,
  onLoadMore,
  root = null,
  rootMargin = '400px 0px',
  threshold = 0,
}: Args) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled) return
    if (!hasNextPage) return
    const el = ref.current
    if (!el) return

    const autoRoot = root ?? getScrollParent(el)
    let busy = false

    const trigger = () => {
      if (busy) return
      if (isFetchingNextPage) return
      busy = true
      Promise.resolve(onLoadMore()).finally(() => {
        busy = false
      })
    }

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first?.isIntersecting) trigger()
      },
      { root: autoRoot as Element | null, rootMargin, threshold }
    )

    io.observe(el)

    setTimeout(() => {
      try {
        const rect = el.getBoundingClientRect()
        const rootBottom = autoRoot
          ? (autoRoot as Element).getBoundingClientRect().bottom
          : window.innerHeight
        if (rect.top <= rootBottom + 10) trigger()
      } catch (_err) {
        void _err
      }
    }, 50)

    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    enabled,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore,
    rootMargin,
    threshold,
  ])

  return ref
}
