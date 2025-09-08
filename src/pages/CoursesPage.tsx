import SearchFilter from '@src/components/course/SearchFilter'
import { CATEGORY_LIST, SORT_LABELS } from '@src/constants/courses'
import {
  PAGE_TITLES,
  PAGE_DESCRIPTIONS,
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  EMPTY_MESSAGES,
  LIST_SETTINGS,
} from '@src/constants/ui'
import { cn } from '@src/utils/cn'
import { useCourses } from '@src/hooks/course/useCourse'
import { useCourseFilters } from '@src/hooks/course/useCourseFilters'
import { usePagination } from '@src/hooks/course/usePagination'
import { useRecommendedCourses } from '@src/hooks/course/useRecommendedCourses'
import { useBookmark } from '@src/hooks/course/useBookmark'
import LoadingSpinner from '@src/components/course/LoadingSpinner'
import ErrorMessage from '@src/components/course/ErrorMessage'
import CourseStats from '@src/components/course/CourseStats'
import RecommendedSection from '@src/components/course/RecommendedSection'
import CourseGrid from '@src/components/course/CourseGrid'
import LoadMoreButton from '@src/components/course/LoadMoreButton'
import { EmptyState } from '@src/components/course/EmptyState'

interface CoursesPageProps {
  className?: string
}

export default function CoursesPage({ className }: CoursesPageProps) {
  const { courses, loading, error, refetch } = useCourses()
  const {
    filteredCourses,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    totalCount,
    filteredCount,
    appliedFiltersCount,
    resetFilters,
  } = useCourseFilters(courses)

  const { displayedItems, hasMore, loadMore, currentCount } =
    usePagination(filteredCourses)
  const {
    visibleCourses: visibleRecommended,
    canGoLeft,
    canGoRight,
    goLeft,
    goRight,
  } = useRecommendedCourses(courses)

  const { toggleBookmark } = useBookmark()

  // 로딩 상태
  if (loading) {
    return <LoadingSpinner message={LOADING_MESSAGES.COURSES} />
  }

  // 에러 상태
  if (error) {
    return (
      <ErrorMessage
        error={error}
        onRetry={refetch}
        title={ERROR_MESSAGES.LOAD_COURSES}
        iconType="LOAD_COURSES"
      />
    )
  }

  // 강의가 없는 경우
  if (courses.length === 0) {
    return (
      <div className={cn('min-h-screen bg-gray-50', className)}>
        <div className="border-b border-gray-200 bg-white px-6 py-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {PAGE_TITLES.COURSES}
            </h1>
            <p className="text-gray-600">{PAGE_DESCRIPTIONS.COURSES}</p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-8">
          <EmptyState
            title={EMPTY_MESSAGES.COURSES}
            description="새로운 강의가 곧 업데이트될 예정입니다."
            iconType="COURSES"
          />
        </div>
      </div>
    )
  }

  // 메인 렌더링
  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {/* 페이지 헤더 */}
      <header className="border-b border-gray-200 bg-white px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {PAGE_TITLES.COURSES}
          </h1>
          <p className="text-gray-600">{PAGE_DESCRIPTIONS.COURSES}</p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* 추천 강의 섹션 - 최소 6개 이상일 때만 표시 */}
        {visibleRecommended.length >= LIST_SETTINGS.PREVIEW_ITEMS && (
          <RecommendedSection
            visibleCourses={visibleRecommended}
            canGoLeft={canGoLeft}
            canGoRight={canGoRight}
            goLeft={goLeft}
            goRight={goRight}
            onBookmark={toggleBookmark}
          />
        )}

        {/* 검색 및 필터 영역 */}
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSort={sortBy}
          onSortChange={setSortBy}
          categories={CATEGORY_LIST}
          sortOptions={SORT_LABELS}
          appliedFiltersCount={appliedFiltersCount}
          onResetFilters={resetFilters}
        />

        {/* 강의 목록 섹션 */}
        <section>
          {/* 통계 정보 */}
          <CourseStats
            displayedCount={currentCount}
            totalCount={totalCount}
            filteredCount={filteredCount}
            searchQuery={searchQuery}
          />

          {/* 강의 그리드 또는 빈 상태 */}
          {displayedItems.length > 0 ? (
            <>
              <CourseGrid
                courses={displayedItems}
                onBookmark={toggleBookmark}
              />

              {/* 더 보기 버튼 */}
              {hasMore && (
                <LoadMoreButton onClick={loadMore} className="mt-8" />
              )}
            </>
          ) : (
            <EmptyState
              title={EMPTY_MESSAGES.FILTERED_COURSES}
              description={
                searchQuery
                  ? `'${searchQuery}' ${EMPTY_MESSAGES.SEARCH_RESULTS.replace('검색 결과가 없습니다.', '검색 결과가 없습니다. 다른 검색어를 시도해보세요.')}`
                  : '선택한 필터 조건에 맞는 강의가 없습니다. 필터를 조정해보세요.'
              }
              iconType="SEARCH_RESULTS"
            />
          )}
        </section>
      </main>
    </div>
  )
}
