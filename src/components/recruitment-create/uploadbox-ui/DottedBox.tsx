import { cva } from 'class-variance-authority'
import type { HTMLAttributes, ReactNode } from 'react'

const BOX = cva(
  'rounded-xl border-2 border-dashed p-6 sm:p-8 grid place-items-center transition-colors',
  {
    variants: {
      state: {
        idle: 'border-gray-300 bg-white',
        active: 'border-blue-500 bg-blue-50',
        reject: 'border-red-400 bg-red-50',
        disabled: 'border-gray-200 bg-gray-50 opacity-60',
      },
      size: {
        sm: 'min-h-28',
        md: 'min-h-36',
        lg: 'min-h-40',
      },
      full: { true: 'w-full', false: 'w-[520px]' },
    },
    defaultVariants: { state: 'idle', size: 'md', full: true },
  }
)

interface Props extends HTMLAttributes<HTMLDivElement> {
  state?: 'idle' | 'active' | 'reject' | 'disabled'
  size?: 'sm' | 'md' | 'lg'
  full?: boolean
  children?: ReactNode
}

// Dot로 된 박스만을 출력하는 Component
export default function DottedBox({
  state = 'idle',
  size = 'md',
  full = true,
  className,
  children,
  ...rest
}: Props) {
  return (
    <div className={BOX({ state, size, full, className })} {...rest}>
      {children}
    </div>
  )
}
