import type { TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxLength: number
  valueLength: number
}
export default function TextareaWithCounter({
  maxLength,
  valueLength,
  ...rest
}: Props) {
  return (
    <div className="space-y-1">
      <textarea
        className="focus:outline-primary-500 h-[122px] w-full resize-none rounded-lg border border-gray-500 px-3 py-2 placeholder:text-sm placeholder:text-gray-400 placeholder:italic disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        maxLength={maxLength}
        {...rest}
      />
      <div className="text-xs text-gray-500">
        {valueLength}/{maxLength}
      </div>
    </div>
  )
}
