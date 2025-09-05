import { cva } from 'class-variance-authority'

export const modalPanel = cva(
  // 공통 스타일
  'absolute left-1/2 top-1/2 w-[min(92vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-2xl',
  {
    variants: {
      size: {
        sm: 'max-w-[480px]',
        md: 'max-w-[672px]',
        lg: 'max-w-[920px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)
