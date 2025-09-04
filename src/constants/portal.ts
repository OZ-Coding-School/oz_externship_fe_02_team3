export const PORTAL_TARGET_ID = {
  OVERLAY: 'overlay-root',
  TOAST: 'toast-root', // 토스트
} as const

export type PortalTargetId = 'overlay-root' | 'toast-root'
