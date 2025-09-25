import { useState } from 'react'
import SearchFilter from '@src/components/course/course-filter-bar/SearchFilter'
import UserCourse from '@src/components/course/user-course/UserCourse'
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@src/constants/ui'
import { cn } from '@src/utils/cn'
import { useCourses } from '@src/hooks/course/useCourse'
import { useCourseFilters } from '@src/hooks/course/useCourseFilters'
import { usePagination } from '@src/hooks/course/usePagination'
import { useBookmark } from '@src/hooks/course/useBookmark'
import { useIntersectionObserver } from '@src/hooks/useIntersectionObserver'
import LoadingSpinner from '@src/components/commons/LoadingSpinner'
import ErrorMessage from '@src/components/course/ErrorMessage'
import { CourseHeader } from '@src/components/course/course-header/CourseHeader'
import EmptyCourses from '@src/components/course/course-content/EmptyCourses'
import CourseContent from '@src/components/course/course-content/CourseContent'

interface CoursesPageProps {
  className?: string
}

export default function CoursesPage({ className }: CoursesPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const toggleAuth = () => setIsAuthenticated((prev) => !prev)

  const { courses, loading, error, refetch } = useCourses()
  const { filteredCourses, searchQuery } = useCourseFilters(courses)
  const { displayedItems, hasMore, loadMore } = usePagination(filteredCourses)
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

  if (courses.length === 0 && isAuthenticated) {
    return <EmptyCourses className={className} />
  }

  // 메인 렌더링
  return (
    <div
      className={cn(
        'justify-center8 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center'
      )}
    >
      <button
        onClick={toggleAuth}
        className="mb-6 rounded-lg bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
      >
        {isAuthenticated ? '로그아웃 상태로 전환' : '로그인 상태로 전환'}
      </button>

      <CourseHeader />
      <UserCourse isAuthenticated={isAuthenticated} />
      <SearchFilter />
      <CourseContent
        courses={courses}
        displayedItems={displayedItems}
        searchQuery={searchQuery}
        hasMore={hasMore}
        targetRef={targetRef}
        onBookmark={toggleBookmark}
      />
    </div>
  )
}
