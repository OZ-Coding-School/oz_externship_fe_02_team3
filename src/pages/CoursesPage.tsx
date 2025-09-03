import React from 'react'
import SearchFilter from '@src/components/Course/SearchFilter'
import { CATEGORY_LIST, SORT_LABELS } from '../constants/courses'
import { cn } from '../utils/cn'
import {
  useCourses,
  useCourseFilters,
  usePagination,
  useRecommendedCourses,
  useBookmark,
} from '@src/hooks/Course'

interface CoursesPageProps {
  className?: string
}

const CoursesPage: React.FC<CoursesPageProps> = ({ className }) => {
  // 비즈니스 로직 훅들
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

  // 로딩 상태 처리
  if (loading) {
    return <LoadingSpinner />
  }

  // 에러 상태 처리
  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  // 메인 렌더링 (순수한 뷰 로직)
  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {/* 페이지 헤더 */}
      <div className="border-b border-gray-200 bg-white px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            IT 강의 목록
          </h1>
          <p className="text-gray-600">
            개발자를 위한 최고의 강의들을 만나보세요
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* 추천 강의 섹션 */}
        <RecommendedSection
          visibleCourses={visibleRecommended}
          canGoLeft={canGoLeft}
          canGoRight={canGoRight}
          goLeft={goLeft}
          goRight={goRight}
          onBookmark={toggleBookmark}
        />

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
        />

        {/* 강의 목록 섹션 */}
        <div className="mb-6">
          {/* 통계 정보 */}
          <CourseStats
            displayedCount={currentCount}
            totalCount={totalCount}
            filteredCount={filteredCount}
            searchQuery={searchQuery}
          />

          {/* 강의 그리드 */}
          <CourseGrid courses={displayedItems} onBookmark={toggleBookmark} />

          {/* 더 보기 버튼 */}
          {hasMore && <LoadMoreButton onClick={loadMore} />}
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
