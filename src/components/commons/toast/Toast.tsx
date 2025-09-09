import type { ReactNode } from 'react'
import { PORTAL_TARGET_ID } from '@src/constants/portal'
import Portal from '../portal/Portal'
import {
  AlertTriangle,
  CheckCircle2,
  X,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@src/utils/cn'
import Icon from '../Icon'

type ToastType = 'success' | 'error' | 'warning'

const COLORS: Record<
  ToastType,
  { box: string; icon: string; text: string; bar: string }
> = {
  success: {
    box: 'bg-success-100 border-success-500',
    icon: 'text-success-500 ',
    text: 'text-success-500 ',
    bar: 'bg-success-100',
  },
  error: {
    box: 'bg-danger-100 border-danger-500',
    icon: 'text-danger-500 ',
    text: 'text-danger-100 ',
    bar: 'bg-danger-100',
  },
  warning: {
    box: 'bg-primary-100 border-primary-500',
    icon: 'text-primary-500 ',
    text: 'text-primary-500 ',
    bar: 'bg-primary-100',
  },
}

const ICON_MAP: Record<ToastType, LucideIcon> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
}

interface ToastProps {
  type: ToastType
  title?: string
  children?: ReactNode
  onClose?: () => void
  showBar?: boolean
}

export default function Toast({
  type,
  title,
  children,
  onClose,
  showBar,
}: ToastProps) {
  return (
    <Portal targetId={PORTAL_TARGET_ID.TOAST}>
      <div
        role="status"
        aria-live="polite"
        className="w-[min(92vw, 380px)] pointer-events-none fixed top-4 right-4 z-[9999] flex flex-col gap-2"
      >
        <div
          className={cn(
            'pointer-events-auto flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-white backdrop-blur',
            COLORS[type].box
          )}
        >
          <div className="mt-0.5">
            <Icon
              icon={ICON_MAP[type]}
              className={COLORS[type].icon}
              size="md"
            />
          </div>
          <div className="min-w-0 flex-1">
            {title && (
              <h4
                className={cn(
                  'truncate text-[15px] font-semibold',
                  COLORS[type].text
                )}
              >
                {title}
              </h4>
            )}
            {children && (
              <p
                className={cn(
                  'mt-0.5 text-sm leading-5 break-words',
                  COLORS[type].text
                )}
              >
                {children}
              </p>
            )}
          </div>
          {onClose && (
            <button
              aria-label="close toast"
              onClick={onClose}
              className="ml-1 shrink-0 rounded p-1 text-white/50 hover:text-white focus:text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
            >
              <Icon icon={X} size="sm" className={COLORS[type].icon} />
            </button>
          )}
        </div>
        {showBar && (
          <div className={cn('h-1 w-full rounded-md', COLORS[type].bar)} />
        )}
      </div>
    </Portal>
  )
}
