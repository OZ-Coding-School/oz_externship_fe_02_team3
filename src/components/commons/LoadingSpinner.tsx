import { LOADING_MESSAGES } from '@src/constants/ui'
import { cn } from '@src/utils/cn'

interface LoadingSpinnerProps {
  message?: string
  className?: string
}

export default function LoadingSpinner({
  message = LOADING_MESSAGES.COURSES,
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-6 bg-gray-50',
        className
      )}
    >
      <div className="border-primary-500 mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-b-2"></div>
      <div className="flex flex-col items-center gap-2">
        <h4 className="text-lg font-semibold text-gray-900">{message}</h4>
        <p className="text-md text-gray-500">잠시만 기다려주세요...</p>
      </div>
    </div>
  )
}
