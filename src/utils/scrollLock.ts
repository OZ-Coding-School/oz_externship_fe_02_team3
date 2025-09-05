//중첩 모달때문에... 블리언 안씀
let lockCount = 0
let restore: (() => void) | null = null
let savedY = 0

export const lockScroll = () => {
  lockCount += 1
  if (lockCount > 1) return

  const { style } = document.body

  // 기존 값 백업
  const prev = {
    overflow: style.overflow,
    position: style.position,
    width: style.width,
    top: style.top,
    paddingRight: style.paddingRight,
  }

  // 현재 스크롤 위치
  savedY = window.scrollY

  // 레이아웃 점프 방지
  const gap = window.innerWidth - document.documentElement.clientWidth

  // 잠금 적용: body를 fixed로 고정, top에 음수 스크롤 저장
  Object.assign(style, {
    overflow: 'hidden',
    position: 'fixed',
    width: '100%',
    top: `-${scrollY}px`,
    paddingRight: gap > 0 ? `${gap}px` : prev.paddingRight,
  })

  // 모달이 닫히면 부드럽게 그 위치로 되돌아감
  restore = () => {
    Object.assign(style, prev)
    window.scrollTo(0, savedY)
  }
}

export const unlockScroll = () => {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0 && restore) {
    const fn = restore
    restore = null
    fn()
  }
}
