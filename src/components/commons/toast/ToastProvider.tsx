import { TOAST_DEFAULTS, TOAST_DURATION_BY_TYPE } from '@src/constants/toast'
import {
  makeToastId,
  type ToastItem,
  type ToastOptions,
  type ToastType,
} from '@src/types/toast'
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import Portal from '../portal/Portal'
import { PORTAL_TARGET_ID } from '@src/constants/portal'
import { cn } from '@src/utils/cn'

import { AnimatePresence } from 'framer-motion'
import ToastCard from './ToastCard'

interface ToastCtx {
  show: (opts?: ToastOptions) => string
  remove: (id: string) => void
  success: (opts?: Omit<ToastOptions, 'type'>) => string
  error: (opts?: Omit<ToastOptions, 'type'>) => string
  warning: (opts?: Omit<ToastOptions, 'type'>) => string
}

interface ToastProviderProps {
  children: ReactNode
  max?: number // 최대 몇개의 Toast알림을 보여줄건지
}

export const ToastContext = createContext<ToastCtx | null>(null)

export function ToastPorvider({ children, max = 5 }: ToastProviderProps) {
  type ToastState = { visible: ToastItem[]; queue: ToastItem[] } //바로 보여지는 토스트알림 5개, 큐에 저정되어 나중에 보여줄 대기열
  const [state, setState] = useState<ToastState>({ visible: [], queue: [] })

  const removeToast = useCallback((id: string) => {
    setState((prevState) => {
      const nextVisible = prevState.visible.filter((toast) => toast.id !== id)

      if (
        nextVisible.length !== prevState.visible.length &&
        prevState.queue.length > 0
      ) {
        // 앞에서 하나 꺼내기
        const [next, ...rest] = prevState.queue
        // 화면에는 항상 위 로 최신이 위 정책 유지
        return { visible: [next, ...nextVisible], queue: rest }
      }
      return { ...prevState, visible: nextVisible }
    })
  }, [])

  const showToast = useCallback(
    (opts: ToastOptions = {}) => {
      const id = opts.id ?? makeToastId()
      const type: ToastType = opts.type ?? 'success'
      const durationMs =
        opts.durationMs ??
        TOAST_DURATION_BY_TYPE[type] ??
        TOAST_DEFAULTS.durationMs

      const item: ToastItem = {
        id,
        type,
        title: opts.title,
        content: opts.content,
        durationMs,
        pauseOnHover: opts.pauseOnHover ?? true,
        showBar: opts.showBar ?? true,
      }

      setState((prevState) => {
        if (prevState.visible.length < max) {
          // 자리가 있으면 바로 위에 표시
          return { ...prevState, visible: [item, ...prevState.visible] }
        }
        // 자리가 없으면 큐의 뒤에 추가
        return { ...prevState, queue: [...prevState.queue, item] }
      })

      return id
    },
    [max]
  )
  const api = useMemo<ToastCtx>(
    () => ({
      show: showToast, // 기본 show 함수 옵션(title, content, duration) 받아서 토스트 생성
      remove: removeToast, // id 기반으로 visible/queue에서 토스트 제거
      // success, error, warning 헬퍼 함수
      // type을 자동으로 주입해서 호출 편하게 만들어 ex) toast.success({ title: '성공!' })
      success: (opts) => showToast({ ...opts, type: 'success' }),
      error: (opts) => showToast({ ...opts, type: 'error' }),
      warning: (opts) => showToast({ ...opts, type: 'warning' }),
    }),
    [showToast, removeToast]
  )

  return (
    <ToastContext.Provider value={api}>
      {children}

      <Portal targetId={PORTAL_TARGET_ID.TOAST}>
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={cn(
            'pointer-events-none fixed z-[1200] flex w-[min(92vw,380px)] flex-col gap-2',
            'top-4 right-4'
          )}
        >
          <AnimatePresence mode="popLayout">
            {state.visible.map((toast) => (
              <ToastCard
                key={toast.id}
                type={toast.type} // success | error | warning
                title={toast.title} // 토스트 알림 제목
                durationMs={toast.durationMs} // 토스트 알림 노출 시간
                pauseOnHover={toast.pauseOnHover} // 토스트 알림 hover시 시간 정지
                showBar={toast.showBar} // Progress 진행바
                className="pointer-events-auto"
                onClose={() => removeToast(toast.id)}
                onAutoClose={() => removeToast(toast.id)}
              >
                {toast.content}
              </ToastCard>
            ))}
          </AnimatePresence>
        </div>
      </Portal>
    </ToastContext.Provider>
  )
}
