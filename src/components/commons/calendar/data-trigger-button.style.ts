import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-between flex-wrap', // 내부 아이템 정렬
    'rounded-xl border text-sm bg-white', // 모양, 기본 배경
    'transition-colors', // hover 등 색상 전환 부드럽게
    'focus:outline-none focus:ring-2 focus:ring-blue-500/50', // 포커스 상태
    'disabled:cursor-not-allowed disabled: opacity-60', // 비활성화 상태
  ].join(' '),
  {
    variants: {
      variant: {
        outline: 'border-gray-300 hover:bg-gray-50', // outline: 기본 버튼, 테두리 있음
        ghost: 'border-transparent bg-transparent hover:bg-gray-50', // ghost: 배경/테두리 없음, hover 시 회색 배경
        solid: 'border-transparent bg-gray-100 hover:bg-gray-200', // solid: 배경 회색, hover 시 더 진한 회색
      },
      size: {
        sm: 'px-3 py-2 text-xs rounded-lg', // sm: 작은 버튼 (text-xs, padding 작음)
        md: 'px-3.5 py-2.5 text-sm rounded-xl', // md: 기본 버튼 (text-sm, padding 보통)
        lg: 'px-4 py-3 text-base rounded-2xl', // lg: 큰 버튼 (text-base, padding 큼)
      },
      fullWidth: {
        true: 'w-full', // true: 가로폭 100% 확장
        false: '', // false: 내용에 맞춤
      },
    },
    compoundVariants: [
      { variant: 'solid', size: 'lg', className: 'shadow-sm' }, // (solid + lg) 조합일 때: `shadow-sm` 자동 추가
    ],
    defaultVariants: {
      variant: 'outline',
      size: 'md',
      fullWidth: false,
    },
  }
)

/*
 * labelVariants
 * - 버튼 안 텍스트 색상 정의
 * - 값이 있으면 진한 색, 없으면 회색 플레이스홀더
 */
export const labelVariants = cva('', {
  variants: {
    hasValue: {
      true: 'text-gray-900',
      false: 'text-gray-400',
    },
  },
  defaultVariants: { hasValue: false },
})
