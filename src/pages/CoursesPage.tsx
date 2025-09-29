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
import { useLoggedIn, useAuthReady } from '@src/store/authLight'

interface CoursesPageProps {
  className?: string
}

export default function CoursesPage({ className }: CoursesPageProps) {
  const loggedIn = useLoggedIn()
  const authReady = useAuthReady()

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

  if (!authReady) {
    return (
      <div className="h-screen w-full">
        <LoadingSpinner message="로그인 상태 확인 중..." />
      </div>
    )
  }

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

  if (courses.length === 0 && loggedIn) {
    return <EmptyCourses className={className} />
  }

  return (
    <div
      className={cn(
        'justify-center8 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center',
        className
      )}
    >
      <CourseHeader />
      <UserCourse isAuthenticated={loggedIn} />
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
