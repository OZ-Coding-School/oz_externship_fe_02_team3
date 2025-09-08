import { cva, type VariantProps } from 'class-variance-authority'

export const pageLinkClass = cva(
  'flex items-center gap-2 font-medium cursor-pointer w-fit',
  {
    variants: {
      variant: {
        filled: 'bg-primary-500 text-white rounded-lg',
        outline:
          'bg-white text-primary-600 border border-primary-500 rounded-lg',
        ghost: 'bg-transparent text-primary-600 rounded-lg',
        text: 'bg-transparent text-gray-700',
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
      variant: 'filled',
      size: 'base',
    },
  }
)

export type PageLinkClassProps = VariantProps<typeof pageLinkClass>
