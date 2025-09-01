interface BadgeProps {
  badgeTitle: string
  sideClass?: string
}

const Badge = ({ badgeTitle, sideClass = '' }: BadgeProps) => {
  return (
    <p
      className={`w-fit ${sideClass} flex items-center justify-center rounded px-2 py-1 text-xs`}
    >
      {badgeTitle}
    </p>
  )
}

export default Badge
