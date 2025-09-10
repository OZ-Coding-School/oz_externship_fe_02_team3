import type { ReactNode } from 'react'

export type ToastType = 'success' | 'error' | 'warning'

export interface ToastOptions {
  id?: string
  type?: ToastType
  title?: string
  content?: ReactNode
  durationMs?: number
  pauseOnHover?: boolean
  showBar?: boolean
}

export interface ToastItem extends Required<Pick<ToastOptions, 'id' | 'type'>> {
  title?: string
  content?: ReactNode
  durationMs: number
  pauseOnHover?: boolean
  showBar?: boolean
}

export const makeToastId = () => crypto.randomUUID() //토스트 개별 고유 아이디 생성
