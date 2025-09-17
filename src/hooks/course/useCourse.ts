import { useState, useEffect, useCallback } from 'react'
import { mockCoursesData } from '@src/mock/coursesData'
import type { Course } from '@src/types/course'
import type { UseCoursesReturn } from '@src/types/hooks'
import type { ApiError } from '@src/types/api'

export const useCourses = (testEmptyState = false): UseCoursesReturn => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadCourses = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      // 시뮬레이션을 위한 지연
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (testEmptyState) {
        setCourses([])
      } else {
        setCourses(mockCoursesData)
      }
    } catch (err: unknown) {
      const apiError = err as ApiError
      setError(apiError.message || '강의 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [testEmptyState])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  return {
    courses,
    loading,
    error,
    refetch: loadCourses,
  }
}
