import { useState, useEffect } from 'react'
import { mockCoursesData } from '@src/data/coursesData'
import type { Course } from '@src/types/course'
import type { UseCoursesReturn } from '@src/types/hooks'
import type { ApiError } from '@src/types/api'

export const useCourses = (): UseCoursesReturn => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadCourses = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      const data: Course[] = mockCoursesData.map((mockCourse) => ({
        id: mockCourse.id,
        provider: mockCourse.platform,
        title: mockCourse.title,
        instructor: mockCourse.author,
        description: mockCourse.description,
        rating: mockCourse.reviewRating,
        reviewCount: mockCourse.reviewCount,
        price: mockCourse.price,
        originalPrice: mockCourse.originalPrice,
        thumbnailUrl: mockCourse.image,
        category: mockCourse.category,
        tags: [],
      }))

      setCourses(data)
    } catch (err: unknown) {
      const apiError = err as ApiError
      setError(apiError.message || '강의 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  return {
    courses,
    loading,
    error,
    refetch: loadCourses,
  }
}
