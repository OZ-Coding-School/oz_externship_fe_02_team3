import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { TOAST } from './ui'

export type ToastType = 'success' | 'error' | 'warning'

export const TOAST_DEFAULTS = {
  durationMs: TOAST.DEFAULT_DURATION, // ul.ts 공통상수
} as const

export const TOAST_ICONS: Record<ToastType, LucideIcon> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
}

//각 토스트 별(success/error/warning 섹상)
export const TOAST_COLORS: Record<
  ToastType,
  { box: string; icon: string; text: string; bar: string }
> = {
  success: {
    box: 'bg-success-100 border-success-500',
    icon: 'text-success-500',
    text: 'text-success-500',
    bar: 'bg-success-100',
  },
  error: {
    box: 'bg-danger-100 border-danger-500',
    icon: 'text-danger-500',
    text: 'text-danger-500',
    bar: 'bg-danger-100',
  },
  warning: {
    box: 'bg-primary-100 border-primary-500',
    icon: 'text-primary-500',
    text: 'text-primary-500',
    bar: 'bg-primary-100',
  },
}

//토스트 닫는 버튼 색상 커스텀
export const TOAST_CLOSE_BTN: Record<ToastType, string> = {
  success: 'text-success-500 hover:bg-success-600 hover:text-success-100 ',
  error: 'text-danger-500 hover:bg-danger-600  hover:text-danger-100',
  warning: 'text-primary-500 hover:bg-primary-600 hover:text-primary-100 ',
}

export const TOAST_DURATION_BY_TYPE: Record<ToastType, number> = {
  success: TOAST.SUCCESS_DURATION,
  error: TOAST.ERROR_DURATION,
  warning: TOAST.WARNING_DURATION,
}
