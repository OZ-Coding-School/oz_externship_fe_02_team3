import type { Course } from '../types/course'
import { mockCoursesData } from '../types/course'

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

const normalizeMockData = (): Course[] => {
  return mockCoursesData.map((course) => ({
    ...course,
    instructor: course.author,
    rating: course.reviewRating,
    provider: course.platform,
  }))
}

// 강의 관련 API 함수들
export const courseFetcher = {
  getAll: async (): Promise<Course[]> => {
    try {
      // TODO: 실제 API로 교체
      // return baseFetch<CoursesResponse>('/api/courses').then(res => res.data);

      // 현재는 mock 데이터 반환 (로딩 시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return normalizeMockData()
    } catch (error) {
      throw new FetchError(
        '강의 목록을 불러오는데 실패했습니다.',
        500,
        'FETCH_COURSES_FAILED'
      )
    }
  },

  // 카테고리별 강의 조회
  getByCategory: async (category: string): Promise<Course[]> => {
    try {
      // TODO: 실제 API로 교체
      // return baseFetch<CoursesResponse>(`/api/courses?category=${category}`);

      await new Promise((resolve) => setTimeout(resolve, 800))
      const normalizedData = normalizeMockData()
      return normalizedData.filter((course) => course.category === category)
    } catch (error) {
      throw new FetchError(
        `카테고리 '${category}' 강의를 불러오는데 실패했습니다.`,
        500,
        'FETCH_CATEGORY_FAILED'
      )
    }
  },

  // 검색
  search: async (query: string): Promise<Course[]> => {
    try {
      // TODO: 실제 API로 교체
      // return baseFetch<CoursesResponse>(`/api/courses/search?q=${query}`);

      await new Promise((resolve) => setTimeout(resolve, 600))
      const normalizedData = normalizeMockData()
      return normalizedData.filter(
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

  // 추천 강의 조회
  getRecommended: async (limit: number = 6): Promise<Course[]> => {
    try {
      // TODO: 실제 API로 교체
      // return baseFetch<CoursesResponse>(`/api/courses/recommended?limit=${limit}`);

      await new Promise((resolve) => setTimeout(resolve, 500))
      const normalizedData = normalizeMockData()
      return normalizedData
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

export const isFetchError = (error: unknown): error is FetchError => {
  return error instanceof FetchError
}

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
