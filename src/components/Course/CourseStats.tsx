import React from 'react'

interface CourseStatsProps {
  displayedCount: number
  totalCount: number
  filteredCount: number
  searchQuery?: string
}

export default function CourseStats({
  displayedCount,
  totalCount,
  filteredCount,
  searchQuery,
}: CourseStatsProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <p className="text-gray-600">
        {displayedCount}개 표시 / 총 {filteredCount}개
        {searchQuery && (
          <span className="ml-2 text-blue-600">{searchQuery} 검색 결과</span>
        )}
      </p>
      {filteredCount !== totalCount && (
        <p className="text-sm text-gray-500">전체 {totalCount}개 중 필터링됨</p>
      )}
    </div>
  )
}
