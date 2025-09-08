import Button from '../button/Button'
import Icon from '@components/Icon'
import { BUTTON_TEXT, ERROR_UI, ERROR_ICONS } from '@src/constants/ui'
import type { LucideIcon } from 'lucide-react'

interface ErrorMessageProps {
  error: string
  onRetry?: () => void
  title?: string
  iconType?: keyof typeof ERROR_ICONS
  customIcon?: LucideIcon
  iconClassName?: string
}

export default function ErrorMessage({
  error,
  onRetry,
  title = ERROR_UI.DEFAULT_TITLE,
  iconType,
  customIcon,
  iconClassName = 'stroke-red-500',
}: ErrorMessageProps) {
  // 아이콘 결정 우선순위: customIcon > iconType > DEFAULT_ICON
  const IconComponent =
    customIcon || (iconType && ERROR_ICONS[iconType]) || ERROR_UI.DEFAULT_ICON

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <Icon
              icon={IconComponent}
              size="lg"
              className={`h-16 w-16 ${iconClassName}`}
            />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">{title}</h2>
          <p className="mb-6 text-lg text-red-600">{error}</p>
          {onRetry && (
            <Button
              variant="primary"
              size="base"
              buttonInnerText={BUTTON_TEXT.RETRY}
              onClick={onRetry}
            />
          )}
        </div>
      </div>
    </div>
  )
}
