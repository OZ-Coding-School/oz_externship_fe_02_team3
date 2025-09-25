import { STATS_TEXT } from '@src/constants/ui'

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
    <section className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
        <p className="text-gray-600">
          <span className="font-medium">
            {STATS_TEXT.DISPLAYED_COUNT(displayedCount)}
          </span>{' '}
          {STATS_TEXT.TOTAL_PREFIX}{' '}
          <span className="font-medium">
            {STATS_TEXT.TOTAL_COUNT(filteredCount)}
          </span>
          {searchQuery && (
            <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-700">
              {searchQuery} {STATS_TEXT.SEARCH_RESULT_TAG}
            </span>
          )}
        </p>
      </div>

      {filteredCount !== totalCount && (
        <p className="text-sm text-gray-500">
          {STATS_TEXT.FILTERED_PREFIX}{' '}
          <span className="font-medium">
            {STATS_TEXT.TOTAL_COUNT(totalCount)}
          </span>{' '}
          {STATS_TEXT.FILTERED_SUFFIX}
        </p>
      )}
    </section>
  )
}
