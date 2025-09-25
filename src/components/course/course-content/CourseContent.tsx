import { EmptyState } from '@src/components/commons/EmptyState'
import { EMPTY_MESSAGES } from '@src/constants/ui'
import type { Course } from '@src/types/course'
import CourseList from './CourstList'

interface CourseContentProps {
  courses: Course[]
  displayedItems: Course[]
  searchQuery?: string // 새로 추가
  hasMore: boolean
  targetRef: React.RefObject<HTMLDivElement | null>
  onBookmark: (courseId: number, isBookmarked: boolean) => void
}
const getEmptyDescription = (searchQuery?: string): string => {
  if (searchQuery) {
    return `'${searchQuery}' 검색 결과가 없습니다. 다른 검색어를 시도해보세요.`
  }
  return '선택한 필터 조건에 맞는 강의가 없습니다. 필터를 조정해보세요.'
}

export default function CourseContent({
  courses,
  displayedItems,
  searchQuery,
  hasMore,
  targetRef,
  onBookmark,
}: CourseContentProps) {
  // 전체 강의는 있지만 displayedItems가 없고 검색어도 없을 때
  if (courses.length > 0 && displayedItems.length === 0 && !searchQuery) {
    return (
      <EmptyState
        title={EMPTY_MESSAGES.FILTERED_COURSES}
        description="다른 검색어나 필터를 시도해보세요."
        iconType="FILTERED_COURSES"
        wrapperClassName="w-full"
        iconClassName="stroke-gray-400 w-8 h-8"
        iconContainerClassName="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center"
      />
    )
  }
  // 필터링/검색 후 결과가 없을 때
  if (courses.length === 0) {
    return (
      <EmptyState
        title={EMPTY_MESSAGES.FILTERED_COURSES}
        description={getEmptyDescription(searchQuery)}
        iconType="SEARCH_RESULTS"
        wrapperClassName="w-full px-8"
        iconClassName="stroke-gray-400 w-8 h-8"
        iconContainerClassName="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center"
      />
    )
  }
  return (
    <>
      <CourseList courses={displayedItems} onBookmark={onBookmark} />
      {hasMore && <div ref={targetRef} style={{ height: '1px' }} />}
    </>
  )
}
