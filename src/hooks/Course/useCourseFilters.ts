import { useState, useMemo } from 'react'
import { CATEGORIES, SORT_OPTIONS } from '@src/constants/courses'
import type { Course } from '@src/types/course'
import type { UseCourseFiltersReturn } from '@src/types/hooks'

const sortCourses = (courses: Course[], sortBy: string): Course[] => {
  const sortedCourses = [...courses]

  switch (sortBy) {
    case 'popularity':
    case 'POPULARITY':
      return sortedCourses.sort((a, b) => b.reviewCount - a.reviewCount)

    case 'latest':
    case 'LATEST':
      return sortedCourses.sort((a, b) => b.id - a.id)

    case 'rating':
    case 'RATING':
      return sortedCourses.sort((a, b) => b.rating - a.rating)

    case 'price_low':
    case 'PRICE_LOW':
    case 'priceAsc':
      return sortedCourses.sort((a, b) => a.price - b.price)

    case 'price_high':
    case 'PRICE_HIGH':
    case 'priceDesc':
      return sortedCourses.sort((a, b) => b.price - a.price)

    default:
      return sortedCourses
  }
}

// 검색 필터링 함수 (순수 함수로 분리)
const filterBySearch = (courses: Course[], query: string): Course[] => {
  if (!query.trim()) return courses

  const lowercaseQuery = query.toLowerCase()
  return courses.filter(
    (course: Course) =>
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.instructor.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export const useCourseFilters = (courses: Course[]): UseCourseFiltersReturn => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORIES.ALL
  )
  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS.POPULARITY)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredCourses = useMemo((): Course[] => {
    let result = courses
    if (searchQuery.trim()) {
      result = filterBySearch(result, searchQuery)
    }
    if (selectedCategory !== CATEGORIES.ALL) {
      result = result.filter(
        (course: Course) => course.category === selectedCategory
      )
    }
    return sortCourses(result, sortBy)
  }, [courses, selectedCategory, sortBy, searchQuery])

  const resetFilters = (): void => {
    setSelectedCategory(CATEGORIES.ALL)
    setSortBy(SORT_OPTIONS.POPULARITY)
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
    resetFilters,
    totalCount: courses.length,
    filteredCount: filteredCourses.length,
  }
}
