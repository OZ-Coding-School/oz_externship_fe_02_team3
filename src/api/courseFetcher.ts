import type { Course } from '@src/mock/coursesData'
import { mockCoursesData } from '@src/mock/coursesData'

interface CoursesResponse {
  data: Course[]
  total: number
  page: number
  limit: number
}

interface FetchErrorData {
  message: string
  status?: number
  code?: string
  name: string
}

export class FetchError extends Error implements FetchErrorData {
  public status?: number
  public code?: string
  public name = 'FetchError'

  constructor(message: string, status?: number, code?: string) {
    super(message)
    this.status = status
    this.code = code
  }

  toJSON(): FetchErrorData {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
    }
  }
}

const baseFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new FetchError(`HTTP Error: ${response.status}`, response.status)
    }

    return response.json()
  } catch (error) {
    if (error instanceof FetchError) {
      throw error
    }
    throw new FetchError('네트워크 오류가 발생했습니다.')
  }
}

export const courseFetcher = {
  getAll: async (): Promise<Course[]> => {
    try {
      // TODO: 실제 API로 교체
      // return baseFetch<CoursesResponse>('/api/courses').then(res => res.data);

      // 현재는 mock 데이터 반환 (로딩 시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return mockCoursesData
    } catch (error) {
      throw new FetchError(
        '강의 목록을 불러오는데 실패했습니다.',
        500,
        'FETCH_COURSES_FAILED'
      )
    }
  },

  getByCategory: async (category: string): Promise<Course[]> => {
    try {
      // TODO: 실제 API로 교체
      // return baseFetch<CoursesResponse>(`/api/courses?category=${category}`);

      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockCoursesData.filter((course) => course.category === category)
    } catch (error) {
      throw new FetchError(
        `카테고리 '${category}' 강의를 불러오는데 실패했습니다.`,
        500,
        'FETCH_CATEGORY_FAILED'
      )
    }
  },

  search: async (query: string): Promise<Course[]> => {
    try {
      // TODO: 실제 API로 교체
      // return baseFetch<CoursesResponse>(`/api/courses/search?q=${query}`);

      await new Promise((resolve) => setTimeout(resolve, 600))
      return mockCoursesData.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.author.toLowerCase().includes(query.toLowerCase()) ||
          course.description.toLowerCase().includes(query.toLowerCase())
      )
    } catch (error) {
      throw new FetchError(
        `'${query}' 검색에 실패했습니다.`,
        500,
        'SEARCH_FAILED'
      )
    }
  },

  getRecommended: async (limit: number = 6): Promise<Course[]> => {
    try {
      // TODO: 실제 API로 교체
      // return baseFetch<CoursesResponse>(`/api/courses/recommended?limit=${limit}`);

      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockCoursesData
        .filter((course) => course.reviewRating >= 4.7)
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, limit)
    } catch (error) {
      throw new FetchError(
        '추천 강의를 불러오는데 실패했습니다.',
        500,
        'FETCH_RECOMMENDED_FAILED'
      )
    }
  },
}

// 타입 가드 함수
export const isFetchError = (error: unknown): error is FetchError => {
  return error instanceof FetchError
}

// 에러 처리 헬퍼 함수
export const handleFetchError = (error: unknown): FetchErrorData => {
  if (isFetchError(error)) {
    return error.toJSON()
  }

  return {
    name: 'UnknownError',
    message:
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.',
  }
}
