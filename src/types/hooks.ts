import type { Course } from '@src/types/course'

export interface UseCoursesReturn {
  courses: Course[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export interface UseCourseFiltersReturn {
  filteredCourses: Course[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  resetFilters: () => void
  totalCount: number
  filteredCount: number
}

export interface UsePaginationReturn {
  displayedItems: Course[]
  hasMore: boolean
  loadMore: () => void
  reset: () => void
  currentCount: number
  totalCount: number
}

export interface UseRecommendedCoursesReturn {
  visibleCourses: Course[]
  canGoLeft: boolean
  canGoRight: boolean
  goLeft: () => void
  goRight: () => void
  currentIndex: number
  totalRecommended: number
}

export interface UseBookmarkReturn {
  toggleBookmark: (courseId: number, isBookmarked: boolean) => void
  isBookmarked: (courseId: number) => boolean
  bookmarkedCount: number
}
