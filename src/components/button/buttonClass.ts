import { cva, type VariantProps } from 'class-variance-authority'

export const buttonClass = cva(
  'flex items-center gap-2 justify-center font-medium transition-colors cursor-pointer w-fit',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary-500',
        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-100',
        outline:
          'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:bg-white',
        ghost:
          'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:bg-transparent',
        danger:
          'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-800 disabled:bg-danger-500',
      },
      size: {
        sm: 'px-3 py-2 text-sm rounded-md',
        base: 'px-4 py-2.5 text-sm rounded-lg',
        lg: 'px-6 py-3 text-base rounded-lg',
      },
      iconButtonSize: {
        sm: 'w-8 h-8 p-0 rounded-full',
        md: 'w-10 h-10 p-0 rounded-full',
        lg: 'w-12 h-12 p-0 rounded-full',
        xl: 'w-16 h-16 p-0 rounded-full',
      },
      iconOnly: {
        true: '',
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
    },
  }
)

export type ButtonClassProps = VariantProps<typeof buttonClass>
