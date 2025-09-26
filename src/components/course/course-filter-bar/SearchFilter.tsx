import { FilterResetButton } from './FilterResetButton'
import { ARIA_LABELS } from '@src/constants/ui'
import { useCourseFilters } from '@src/hooks/course/useCourseFilters'
import { useCourses } from '@src/hooks/course/useCourse'
import { SearchBar } from '@src/components/commons/SearchBar'
import FilterSection from './FilterSection'

export default function SearchFilter() {
  const { courses } = useCourses()
  const { setSearchQuery, appliedFiltersCount, resetFilters } =
    useCourseFilters(courses)

  return (
    <section
      className="relative w-full px-8 pt-20 pb-8"
      aria-label={ARIA_LABELS.SEARCH_FILTER}
    >
      {/* <CourseStats
        displayedCount={currentCount}
        totalCount={totalCount}
        filteredCount={filteredCount}
        searchQuery={searchQuery}
      /> */}
      {/* 필터 리셋 버튼 */}
      <div className="absolute top-8 right-8">
        {resetFilters && (
          <FilterResetButton
            onReset={resetFilters}
            appliedFiltersCount={appliedFiltersCount}
            className="h-full"
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-3">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="강의를 검색해보세요..."
          delay={300}
          className="h-[38px] w-full border border-gray-300 bg-white pr-4 pl-2 text-sm"
        />
        <FilterSection />
      </div>
    </section>
  )
}
