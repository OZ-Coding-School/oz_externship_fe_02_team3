import type { ReactNode } from 'react'


interface Props {
  id: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}

export default function FormField({
  id,
  label,
  required,
  error,
  children,
}: Props) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-danger-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-danger-500 text-xs">{error}</p>}
    </div>
  )
}
