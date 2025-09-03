import React from 'react'

interface ErrorMessageProps {
  error: string
  onRetry?: () => void
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => (
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

// components/CourseStats.tsx
import React from 'react'

interface CourseStatsProps {
  displayedCount: number
  totalCount: number
  filteredCount: number
  searchQuery?: string
}

const CourseStats: React.FC<CourseStatsProps> = ({
  displayedCount,
  totalCount,
  filteredCount,
  searchQuery,
}) => (
  <div className="mb-4 flex items-center justify-between">
    <p className="text-gray-600">
      {displayedCount}개 표시 / 총 {filteredCount}개
      {searchQuery && (
        <span className="ml-2 text-blue-600">"{searchQuery}" 검색 결과</span>
      )}
    </p>
    {filteredCount !== totalCount && (
      <p className="text-sm text-gray-500">전체 {totalCount}개 중 필터링됨</p>
    )}
  </div>
)
