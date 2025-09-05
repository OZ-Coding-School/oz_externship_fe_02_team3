import { ActionButton } from './ActionButton'

interface ErrorMessageProps {
  error: string
  onRetry?: () => void
  title?: string
  iconEmoji?: string
}

export default function ErrorMessage({
  error,
  onRetry,
  title = '오류가 발생했습니다',
  iconEmoji = '⚠️',
}: ErrorMessageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-4 text-6xl">{iconEmoji}</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">{title}</h2>
          <p className="mb-6 text-lg text-red-600">{error}</p>
          {onRetry && (
            <ActionButton variant="primary" onClick={onRetry}>
              다시 시도
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  )
}
