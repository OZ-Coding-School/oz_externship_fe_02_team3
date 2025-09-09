import type { Variants } from 'framer-motion'

export const ANIMATIONS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },
  slideUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
  },
  slideRightDown: {
    initial: { opacity: 0, x: 100, y: 100, scale: 0.9 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { opacity: 0, x: 100, scale: 0.9 },
  },
  //추가 하고 싶은 에니메이션은 밑에다 추가
} as const

export type AnimationKey = keyof typeof ANIMATIONS

export type Speed = 'fast' | 'normal' | 'slow'
export const speedToTransition = {
  fast: { duration: 0.15, ease: 'easeOut' },
  normal: { duration: 0.25, ease: 'easeOut' },
  slow: { duration: 0.4, ease: 'easeOut' },
} as const

export function applySpeed(v: Variants, speed: Speed): Variants {
  return {
    ...v,
    animate: {
      ...(v.animate ?? {}),
      transition: { ...speedToTransition[speed] },
    },
    exit: { ...(v.exit ?? {}), transition: { ...speedToTransition[speed] } },
  }
}
