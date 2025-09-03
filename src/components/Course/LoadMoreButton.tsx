import React from 'react'
import { cn } from '@src/utils/cn'

interface LoadMoreButtonProps {
  onClick: () => void
  disabled?: boolean
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onClick,
  disabled = false,
}) => (
  <div className="mt-12 flex justify-center">
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-lg border px-8 py-3 font-medium transition-colors',
        disabled
          ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      )}
    >
      더 보기
    </button>
  </div>
)
