import { LOADING_MESSAGES } from '@src/constants/ui'

interface LoadingSpinnerProps {
  message?: string
}

export default function LoadingSpinner({
  message = LOADING_MESSAGES.COURSES,
}: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-6">
          <div className="border-primary-500 mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <div className="flex flex-col items-center gap-2">
            <h4 className="text-xl font-semibold text-gray-900">{message}</h4>
            <p className="text-base text-gray-500">잠시만 기다려주세요...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
