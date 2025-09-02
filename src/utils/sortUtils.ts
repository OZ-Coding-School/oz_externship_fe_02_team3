import type { Course } from '../data/coursesData'
import { SORT_OPTIONS } from '../constants/courses'

// 정렬 함수 타입 정의
type SortFunction<T> = (a: T, b: T) => number

// 범용 정렬 함수들
export const sortByNumber = <T>(
  key: keyof T,
  ascending = false
): SortFunction<T> => {
  return (a, b) => {
    const valueA = a[key] as unknown as number
    const valueB = b[key] as unknown as number
    return ascending ? valueA - valueB : valueB - valueA
  }
}

// 강의 정렬 함수들
export const courseSorters = {
  [SORT_OPTIONS.POPULARITY]: sortByNumber<Course>('reviewCount'),
  [SORT_OPTIONS.LATEST]: sortByNumber<Course>('id'),
  [SORT_OPTIONS.RATING]: sortByNumber<Course>('reviewRating'),
  [SORT_OPTIONS.PRICE_LOW]: sortByNumber<Course>('price', true), // ascending
} as const

// 메인 정렬 함수
export const sortCourses = (courses: Course[], sortBy: string): Course[] => {
  const sortedCourses = [...courses]
  const sorter = courseSorters[sortBy as keyof typeof courseSorters]

  if (sorter) {
    return sortedCourses.sort(sorter)
  }

  // 기본값: 인기순
  return sortedCourses.sort(courseSorters[SORT_OPTIONS.POPULARITY])
}
