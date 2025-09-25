import { useState } from 'react'
import SearchFilter from '@src/components/course/filters/SearchFilter'
import UserCourseSection from '@src/components/course/course/UserCourseSection'
import { CATEGORY_LIST, SORT_LABELS } from '@src/constants/courses'
import {
  PAGE_TITLES,
  PAGE_DESCRIPTIONS,
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  EMPTY_MESSAGES,
} from '@src/constants/ui'
import { cn } from '@src/utils/cn'
import { useCourses } from '@src/hooks/course/useCourse'
import { useCourseFilters } from '@src/hooks/course/useCourseFilters'
import { usePagination } from '@src/hooks/course/usePagination'
import { useBookmark } from '@src/hooks/course/useBookmark'
import { useIntersectionObserver } from '@src/hooks/useIntersectionObserver'
import LoadingSpinner from '@src/components/commons/LoadingSpinner'
import ErrorMessage from '@src/components/course/common/ErrorMessage'
import CourseStats from '@src/components/course/course/CourseStats'
import CourseGrid from '@src/components/course/course/CourseGrid'
import { EmptyState } from '@src/components/commons/EmptyState'

interface CoursesPageProps {
  className?: string
}

export default function CoursesPage({ className }: CoursesPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const toggleAuth = () => setIsAuthenticated((prev) => !prev)
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

  const { toggleBookmark } = useBookmark()

  const targetRef = useIntersectionObserver({
    enabled: true,
    hasNextPage: hasMore,
    isFetchingNextPage: false,
    onIntersect: loadMore,
    threshold: 1,
  })

  if (loading) {
    return (
      <div className="h-screen w-full">
        <LoadingSpinner message={LOADING_MESSAGES.COURSES} />
      </div>
    )
  }

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

  // 로그인 사용자일 때만 EmptyState 표시
  if (courses.length === 0 && isAuthenticated) {
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
            iconClassName="stroke-primary-500 w-8 h-8"
            iconContainerClassName="bg-primary-50 rounded-full w-20 h-20 flex items-center justify-center"
          />
        </div>
      </div>
    )
  }

  // 메인 렌더링
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-8',
        className
      )}
    >
      <button
        onClick={toggleAuth}
        className="mb-6 rounded-lg bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
      >
        {isAuthenticated ? '로그아웃 상태로 전환' : '로그인 상태로 전환'}
      </button>

      <div className="w-full pt-6">
        <div className="mx-auto max-w-7xl px-8">
          <h2 className="pb-2 text-3xl font-bold text-gray-900">
            {PAGE_TITLES.COURSES}
          </h2>
          <p className="text-gray-600">{PAGE_DESCRIPTIONS.COURSES}</p>
        </div>
      </div>

      <UserCourseSection isAuthenticated={isAuthenticated} />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-lg border border-gray-200 p-6">
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
            classname="mb-0"
            inputClassName="bg-white"
          />
        </div>

        {/* 강의 목록 섹션 */}
        <section>
          <CourseStats
            displayedCount={currentCount}
            totalCount={totalCount}
            filteredCount={filteredCount}
            searchQuery={searchQuery}
          />

          {displayedItems.length > 0 ? (
            <>
              <CourseGrid
                courses={displayedItems}
                onBookmark={toggleBookmark}
              />

              {hasMore && <div ref={targetRef} style={{ height: '1px' }} />}
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
              iconClassName="stroke-gray-400 w-8 h-8"
              iconContainerClassName="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center"
            />
          )}
        </section>
      </section>
    </div>
  )
}
