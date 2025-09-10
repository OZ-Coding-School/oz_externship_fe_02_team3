import { cn } from '@utils/cn'
interface BadgeProps {
  badgeTitle: string
  sideClass?: string
}

function Badge({ badgeTitle, sideClass }: BadgeProps) {
  return (
    <p
      className={cn(
        'flex w-fit items-center justify-center rounded px-2 py-1 text-xs',
        sideClass
      )}
    >
      {badgeTitle}
    </p>
  )
}

export default Badge
