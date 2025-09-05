import { cva, type VariantProps } from 'class-variance-authority'

export const buttonClass = cva(
  'flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary-500 disabled:opacity-50',
        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-100 disabled:opacity-50',
        outline:
          'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:bg-white disabled:opacity-50',
        ghost:
          'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:bg-transparent disabled:opacity-50',
        danger:
          'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-800 disabled:bg-danger-500 disabled:opacity-50',
      },
      size: {
        sm: 'h-9 px-3 py-2 text-sm rounded-[6px]',
        base: 'h-10 px-4 py-2.5 text-[14px] rounded-[8px]',
        lg: 'h-12 px-6 py-3 text-[16px] rounded-[8px]',
      },
      iconOnly: {
        true: 'px-2 py-2',
        false: '',
      },
      fontWeight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
      iconOnly: false,
      fontWeight: 'medium',
    },
  }
)

export type ButtonClassProps = VariantProps<typeof buttonClass>
