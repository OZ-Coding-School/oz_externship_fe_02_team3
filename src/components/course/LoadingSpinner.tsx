import React from 'react'
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
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-500">{message}</p>
        </div>
      </div>
    </div>
  )
}
