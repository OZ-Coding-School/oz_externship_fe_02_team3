import { cn } from '@src/utils/cn'
import '@src/styles/toast.css'

interface ToastProgressProps {
  trackClass: string
  fillClass: string
  durationMs: number
  pauseOnHover?: boolean
  onEnd?: () => void
}

export default function ToastProgress({
  trackClass,
  fillClass,
  durationMs,
  pauseOnHover = true,
  onEnd,
}: ToastProgressProps) {
  return (
    <div className={cn('h-1 w-full overflow-hidden', trackClass)}>
      <div
        className={cn(
          'toast-progress h-full',
          fillClass,
          pauseOnHover && 'group-hover/toast:[animation-play-state:paused]'
        )}
        style={{ animationDuration: `${durationMs}ms` }}
        onAnimationEnd={onEnd}
      ></div>
    </div>
  )
}
