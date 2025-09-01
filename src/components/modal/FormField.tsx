import type { ReactNode } from 'react'

type Props = {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}

export default function FormField({ label, required, error, children }: Props) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-danger-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-danger-500 text-xs">{error}</p>}
    </div>
  )
}
