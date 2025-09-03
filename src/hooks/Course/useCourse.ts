import { useState, useEffect } from 'react'
import { mockCoursesData } from '@src/data/coursesData'
import type { Course } from '@src/types/course'
import type { UseCoursesReturn } from '@src/types/hooks'
import type { ApiError } from '@src/types/api' // ApiError는 api.ts에서 import

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
        provider: mockCourse.platform, // platform → provider
        title: mockCourse.title,
        instructor: mockCourse.author, // author → instructor
        description: mockCourse.description,
        rating: mockCourse.reviewRating, // reviewRating → rating
        reviewCount: mockCourse.reviewCount,
        price: mockCourse.price,
        originalPrice: mockCourse.originalPrice,
        thumbnailUrl: mockCourse.image, // image → thumbnailUrl
        category: mockCourse.category,
        tags: [], // 기본값으로 빈 배열
      }))

      setCourses(data)
    } catch (err: unknown) {
      setError('강의 목록을 불러오는데 실패했습니다.')
      console.error('Failed to fetch courses:', err)
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
