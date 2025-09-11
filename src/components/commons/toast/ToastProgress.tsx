import { cn } from '@src/utils/cn'
import '@src/styles/toast.css'
import { memo, useMemo } from 'react'

interface ToastProgressProps {
  trackClass: string // 진행바 스타일
  fillClass: string // 진행바 채워지는 영역 스타일
  durationMs: number // 진행 시간
  pauseOnHover?: boolean //hover 애니메이션 일시정지 여부
  onEnd?: () => void // 애니메이션 끝났을 때 실행할 콜백
  id?: string
}

export default memo(function ToastProgress({
  trackClass,
  fillClass,
  durationMs,
  pauseOnHover = true,
  onEnd,
  id,
}: ToastProgressProps) {
  // CSS 변수(--toast-duration)에 애니메이션 시간을 주입
  // useMemo : durationMs 변경시에만 객체 새로 생성
  const style = useMemo(
    () => ({ ['--toast-duration' as string]: `${durationMs}ms` }),
    [durationMs]
  )

  return (
    <div
      className={cn('toast-progress h-1 w-full overflow-hidden', trackClass)}
    >
      <div
        key={id ? `${id}-progress` : undefined}
        className={cn(
          'toast-progress__fill', // 기본 애니메이션 클래스 ( 참고 : toast.css 정의 )
          fillClass, // 색상 (type별로 currentColor 적용)
          pauseOnHover && 'group-hover/toast:[animation-play-state:paused]'
        )}
        style={style}
        onAnimationEnd={onEnd}
      />
    </div>
  )
})
