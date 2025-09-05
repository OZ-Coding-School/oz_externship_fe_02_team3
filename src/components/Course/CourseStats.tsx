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
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
        <p className="text-gray-600">
          <span className="font-medium">{displayedCount}개</span> 표시 / 총{' '}
          <span className="font-medium">{filteredCount}개</span>
          {searchQuery && (
            <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-700">
              {searchQuery} 검색 결과
            </span>
          )}
        </p>
      </div>

      {filteredCount !== totalCount && (
        <p className="text-sm text-gray-500">
          전체 <span className="font-medium">{totalCount}개</span> 중 필터링됨
        </p>
      )}
    </div>
  )
}
