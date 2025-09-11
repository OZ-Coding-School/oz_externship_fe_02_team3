import { cva, type VariantProps } from 'class-variance-authority'

export const notificationIconClass = cva(
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
  {
    variants: {
      type: {
        ADD_APPLICATION: 'bg-blue-100',
        APPROVE_APPLICATION: 'bg-green-100',
        REJECT_APPLICATION: 'bg-red-100',
        NEW_MEMBER_JOIN: 'bg-purple-100',
        STUDY_END: 'bg-orange-100',
        REMINDER: 'bg-gray-100',
      },
    },
    defaultVariants: {
      type: 'REMINDER',
    },
  }
)

export const notificationIconStrokeClass = cva('', {
  variants: {
    type: {
      ADD_APPLICATION: 'stroke-[#2563EB]',
      APPROVE_APPLICATION: 'stroke-[#16A34A]',
      REJECT_APPLICATION: 'stroke-[#DC2626]',
      NEW_MEMBER_JOIN: 'stroke-[#9333EA]',
      STUDY_END: 'stroke-[#EA580C]',
      REMINDER: 'stroke-gray-400',
    },
  },
  defaultVariants: {
    type: 'REMINDER',
  },
})
export type NotificationIconClassProps = VariantProps<
  typeof notificationIconClass
>
export const tabClass = cva(
  'flex w-2/3 items-center justify-center pt-3 pb-3.5 text-sm border-b-2 transition-colors cursor-pointer',
  {
    variants: {
      active: {
        true: 'border-primary-500 text-primary-600',
        false: 'border-transparent text-gray-500',
      },
    },
  }
)
