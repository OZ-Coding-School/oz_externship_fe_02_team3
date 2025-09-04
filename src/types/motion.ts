import type { AnimationKey, Speed } from '@src/constants/animations'
import type { Variants } from 'framer-motion'

export interface MotionOptions {
  //'fade' | 'scaleUp' | 'slideUp'
  animation?: AnimationKey
  //완전 커스텀 variants 직접 전달
  variants?: Variants
  // 속도: 'fast' | 'normal' | 'slow'
  speed?: Speed
  // 상태 키 커스터마이즈가 필요할 때만 사용
  initial?: string
  animate?: string
  exit?: string
}
