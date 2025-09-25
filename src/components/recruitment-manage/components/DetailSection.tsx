interface DetailSectionProps {
  title: string
  children?: React.ReactNode
}

export default function DetailSection({ title, children }: DetailSectionProps) {
  if (!children) return null

  return (
    <section className="w-full">
      <h4 className="text-sm font-bold">{title}</h4>
      <div className="text-md rounded-xl bg-gray-50 px-3 py-4 text-gray-700">
        {children}
      </div>
    </section>
  )
}
