import { useState, useMemo, useEffect } from 'react'
import { LIST_SETTINGS } from '@src/constants/ui'
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
    .filter((course) => {
      // rating 또는 reviewRating 중 하나라도 4.7 이상이면 추천
      const rating = course.rating ?? course.reviewRating ?? 0
      return rating >= 4.7
    })
    .sort((a, b) => {
      // reviewCount로 정렬
      const aReviewCount = a.reviewCount ?? 0
      const bReviewCount = b.reviewCount ?? 0
      return bReviewCount - aReviewCount
    })
    .slice(0, limit)
}

export const useRecommendedCourses = (
  courses: Course[]
): UseRecommendedCoursesReturn => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const recommendedCourses = useMemo(
    (): Course[] => getRecommendedCourses(courses, LIST_SETTINGS.PREVIEW_ITEMS),
    [courses]
  )

  useEffect(() => {
    setCurrentIndex(0)
  }, [courses.length])

  const visibleCourses = useMemo(
    (): Course[] =>
      recommendedCourses.slice(
        currentIndex,
        currentIndex + LIST_SETTINGS.COURSES_PER_ROW.DESKTOP
      ),
    [recommendedCourses, currentIndex]
  )

  const canGoLeft: boolean = currentIndex > 0
  const canGoRight: boolean =
    currentIndex + LIST_SETTINGS.COURSES_PER_ROW.DESKTOP <
    recommendedCourses.length

  const goLeft = (): void => {
    if (canGoLeft) {
      setCurrentIndex((prev) =>
        Math.max(0, prev - LIST_SETTINGS.COURSES_PER_ROW.DESKTOP)
      )
    }
  }

  const goRight = (): void => {
    if (canGoRight) {
      setCurrentIndex((prev) =>
        Math.min(
          prev + LIST_SETTINGS.COURSES_PER_ROW.DESKTOP,
          recommendedCourses.length - LIST_SETTINGS.COURSES_PER_ROW.DESKTOP
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
