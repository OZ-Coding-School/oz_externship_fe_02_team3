export default function StatItem({
  value,
  label,
  bgColor = 'bg-white',
  textColor = 'text-white',
  className = '',
}: {
  value: number | string
  label: string
  bgColor?: string
  textColor?: string
  className?: string
}) {
  return (
    <div
      className={[
        'rounded-xl px-4 py-3 text-center',
        bgColor,
        textColor,
        className,
      ].join(' ')}
    >
      <div className="text-xl font-bold sm:text-2xl">{value}</div>
      <div className="mt-0.5 text-xs sm:text-sm">{label}</div>
    </div>
  )
}
