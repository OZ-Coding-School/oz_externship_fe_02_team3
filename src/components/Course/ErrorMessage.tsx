import React from 'react'

interface ErrorMessageProps {
  error: string
  onRetry?: () => void
}

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-4 text-6xl text-red-600">⚠️</div>
          <p className="mb-4 text-lg text-red-600">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              다시 시도
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
