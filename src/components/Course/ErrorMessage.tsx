import { ActionButton } from './ActionButton'
import { BUTTON_TEXT, ERROR_UI } from '@src/constants/ui'

interface ErrorMessageProps {
  error: string
  onRetry?: () => void
  title?: string
  iconEmoji?: string
}

export default function ErrorMessage({
  error,
  onRetry,
  title = ERROR_UI.DEFAULT_TITLE,
  iconEmoji = ERROR_UI.DEFAULT_EMOJI,
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
              {BUTTON_TEXT.RETRY}
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  )
}
