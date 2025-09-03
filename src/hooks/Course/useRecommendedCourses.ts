import { useState, useMemo, useEffect } from 'react'
import { PAGINATION } from '@src/constants/courses'
import type { Course } from '@src/types/course'
import type { UseRecommendedCoursesReturn } from '@src/types/hooks'

// ✅ 로컬 함수로 새로 정의!
const getRecommendedCourses = (
  courses: Course[],
  limit: number = 4
): Course[] => {
  return courses
    .filter((course) => course.rating >= 4.7) // rating 사용
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit)
}

export const useRecommendedCourses = (
  courses: Course[]
): UseRecommendedCoursesReturn => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const recommendedCourses = useMemo(
    (): Course[] =>
      getRecommendedCourses(courses, PAGINATION.RECOMMENDED_COUNT),
    [courses]
  )

  // 강의 목록이 변경되면 인덱스 리셋
  useEffect(() => {
    setCurrentIndex(0)
  }, [courses.length])

  const visibleCourses = useMemo(
    (): Course[] =>
      recommendedCourses.slice(
        currentIndex,
        currentIndex + PAGINATION.RECOMMENDED_VISIBLE
      ),
    [recommendedCourses, currentIndex]
  )

  const canGoLeft: boolean = currentIndex > 0
  const canGoRight: boolean =
    currentIndex + PAGINATION.RECOMMENDED_VISIBLE < recommendedCourses.length

  const goLeft = (): void => {
    if (canGoLeft) {
      setCurrentIndex((prev) =>
        Math.max(0, prev - PAGINATION.RECOMMENDED_VISIBLE)
      )
    }
  }

  const goRight = (): void => {
    if (canGoRight) {
      setCurrentIndex((prev) =>
        Math.min(
          prev + PAGINATION.RECOMMENDED_VISIBLE,
          recommendedCourses.length - PAGINATION.RECOMMENDED_VISIBLE
        )
      )
    }
  }

  return {
    visibleCourses,
    canGoLeft,
    canGoRight,
    goLeft,
    goRight,
    currentIndex,
    totalRecommended: recommendedCourses.length,
  }
}
