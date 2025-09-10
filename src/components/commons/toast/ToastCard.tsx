import {
  TOAST_CLOSE_BTN,
  TOAST_COLORS,
  TOAST_ICONS,
} from '@src/constants/toast'
import { cn } from '@src/utils/cn'
import type { ReactNode } from 'react'
import Icon from '../Icon'
import { X } from 'lucide-react'
import ToastProgress from './ToastProgress'
import { motion } from 'framer-motion'
import {
  ANIMATIONS,
  applySpeed,
  type AnimationKey,
  type Speed,
} from '@src/constants/animations'
import type { ToastType } from '@src/types/toast'

interface ToastCardProps {
  type: ToastType
  title?: string
  children?: ReactNode
  onClose?: () => void
  showBar?: boolean
  durationMs: number
  pauseOnHover?: boolean
  onAutoClose?: () => void
  className?: string
  animation?: AnimationKey
  speed?: Speed
  id?: string
}

export default function ToastCard({
  type,
  title,
  children,
  onClose,
  showBar,
  durationMs,
  pauseOnHover = true,
  onAutoClose,
  className,
  animation = 'slideRightDown',
  speed = 'normal',
  id,
}: ToastCardProps) {
  const leadingIcon = TOAST_ICONS[type] // 각 토스트 type 별 아이콘 ( 참조 : constants/toast.ts)

  return (
    <motion.div
      layout="position"
      variants={applySpeed(ANIMATIONS[animation], speed)}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn('flex w-full flex-col', className)}
    >
      <div
        className={cn(
          'group/toast pointer-events-auto relative overflow-hidden rounded-xl border',
          TOAST_COLORS[type].box // 각 토스트 type 별 색상 ( 참조 : constants/toast.ts)
        )}
      >
        <div className="flex w-full items-start gap-3 px-4 py-3">
          <div className="mt-0.5">
            <Icon
              icon={leadingIcon}
              size="md"
              className={TOAST_COLORS[type].icon}
            />
          </div>
          <div className="min-w-0 flex-1">
            {title && (
              <h4
                className={cn(
                  'truncate text-[15px] font-semibold',
                  TOAST_COLORS[type].text
                )}
              >
                {title}
              </h4>
            )}
            {children && (
              <div
                className={cn(
                  'mt-0.5 text-sm leading-5 break-words',
                  TOAST_COLORS[type].text
                )}
              >
                {children}
              </div>
            )}
          </div>
          {/* 공통 컴포넌트 버튼 사용하려고 적용 해봤으나 호버 색상등 맞지 않음 */}
          {onClose && (
            <button
              type="button"
              aria-label="close toast"
              onClick={onClose}
              className={cn(
                'ml-1 shrink-0 cursor-pointer rounded p-1 transition-colors',
                'focus:outline-none focus-visible:ring-2',
                TOAST_CLOSE_BTN[type]
              )}
            >
              <Icon icon={X} size="sm" />
            </button>
          )}
        </div>
        {/* 토스트 알람 시간 에니메이션 */}
        {showBar && (
          <ToastProgress
            id={id}
            trackClass={TOAST_COLORS[type].bar}
            fillClass={TOAST_COLORS[type].text}
            durationMs={durationMs}
            pauseOnHover={pauseOnHover}
            onEnd={onAutoClose}
          />
        )}
      </div>
    </motion.div>
  )
}
