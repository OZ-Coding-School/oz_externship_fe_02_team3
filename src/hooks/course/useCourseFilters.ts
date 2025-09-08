import { useState, useMemo } from 'react'
import { FILTER_SORT } from '@src/constants/ui'
import { getComparatorBySortKey } from '@src/utils/courseComparators'
import type { Course } from '@src/types/course'

interface UseCourseFiltersResult {
  filteredCourses: Course[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  totalCount: number
  filteredCount: number
  appliedFiltersCount: number
  resetFilters: () => void
}

export function useCourseFilters(courses: Course[]): UseCourseFiltersResult {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    FILTER_SORT.DEFAULT_CATEGORY
  )
  const [sortBy, setSortBy] = useState<string>(FILTER_SORT.DEFAULT_SORT)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // 필터링 및 정렬된 강의 목록
  const filteredCourses = useMemo(() => {
    let result = [...courses]

    // 카테고리 필터링
    if (selectedCategory !== FILTER_SORT.DEFAULT_CATEGORY) {
      result = result.filter(
        (course) =>
          course.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // 검색어 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description?.toLowerCase().includes(query) ||
          course.instructor?.toLowerCase().includes(query)
      )
    }

    // 정렬 적용 (comparator 객체 사용)
    const comparator = getComparatorBySortKey(sortBy)
    result.sort(comparator)

    return result
  }, [courses, selectedCategory, sortBy, searchQuery])

  // 적용된 필터 개수 계산
  const appliedFiltersCount = useMemo(() => {
    let count = 0

    if (selectedCategory !== FILTER_SORT.DEFAULT_CATEGORY) count++
    if (searchQuery.trim()) count++
    if (sortBy !== FILTER_SORT.DEFAULT_SORT) count++

    return count
  }, [selectedCategory, searchQuery, sortBy])

  // 필터 초기화
  const resetFilters = () => {
    setSelectedCategory(FILTER_SORT.DEFAULT_CATEGORY)
    setSortBy(FILTER_SORT.DEFAULT_SORT)
    setSearchQuery('')
  }

  return {
    filteredCourses,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    totalCount: courses.length,
    filteredCount: filteredCourses.length,
    appliedFiltersCount,
    resetFilters,
  }
}
