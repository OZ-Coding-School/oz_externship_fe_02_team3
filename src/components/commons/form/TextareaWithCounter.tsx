import { forwardRef, type TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxLength: number
  valueLength: number
}
const TextareaWithCounter = forwardRef<HTMLTextAreaElement, Props>(
  ({ valueLength = 0, maxLength = 500, ...rest }, ref) => {
    return (
      <div className="space-y-1">
        <textarea
          ref={ref}
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
)
TextareaWithCounter.displayName = 'TextareaWithCounter'
export default TextareaWithCounter
