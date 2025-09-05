import { useState, useMemo, useEffect } from 'react'
import { PAGINATION } from '@src/constants/courses'
import type { Course } from '@src/types/course'
import type { UseRecommendedCoursesReturn } from '@src/types/hooks'

interface GetRecommendedCoursesFunction {
  (courses: Course[], limit: number): Course[]
}

const getRecommendedCourses: GetRecommendedCoursesFunction = (
  courses,
  limit = 4
) => {
  return courses
    .filter((course) => course.rating >= 4.7)
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
