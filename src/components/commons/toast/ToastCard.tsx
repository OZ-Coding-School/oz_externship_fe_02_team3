import {
  TOAST_CLOSE_BTN,
  TOAST_COLORS,
  TOAST_ICONS,
  type ToastType,
} from '@src/constants/toast'
import { cn } from '@src/utils/cn'
import type { ReactNode } from 'react'
import Icon from '../Icon'
import { X } from 'lucide-react'

interface ToastCardProps {
  type: ToastType
  title?: string
  children?: ReactNode
  onClose?: () => void
  showBar?: boolean
  className?: string
}

export default function ToastCard({
  type,
  title,
  children,
  onClose,
  showBar,
  className,
}: ToastCardProps) {
  const leadingIcons = TOAST_ICONS[type]

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div
        className={cn(
          'pointer-events-auto flex w-full items-start gap-3 rounded-xl border px-4 py-3 backdrop-blur',
          TOAST_COLORS[type].box
        )}
      >
        <div className="mt-0.5">
          <Icon
            icon={leadingIcons}
            size="md"
            className={TOAST_COLORS[type].icon}
          />
        </div>
        {/* 토스트 타이틀 성공/주의/오류 */}
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
          {/* 토스트 내용 */}
          {children && (
            <p
              className={cn(
                'mt-0.5 text-sm leading-5 break-words',
                TOAST_COLORS[type].text
              )}
            >
              {children}
            </p>
          )}
        </div>
        {/* 토스트 닫는 버튼 */}
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
      {showBar && (
        <div className={cn('h-1 w-full rounded-md', TOAST_COLORS[type].bar)} />
      )}
    </div>
  )
}
