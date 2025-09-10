import { useState, useEffect } from 'react'
import { mockCoursesData, type Course } from '@src/types/course'
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

      // 시뮬레이션을 위한 지연
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // mockCoursesData가 이미 Course 타입과 호환되므로 직접 사용
      setCourses(mockCoursesData)
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
