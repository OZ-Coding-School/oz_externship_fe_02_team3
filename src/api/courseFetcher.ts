import type { Course } from '../data/coursesData'
import { mockCoursesData } from '../data/coursesData'

// API 응답 타입
interface CoursesResponse {
  data: Course[]
  total: number
  page: number
  limit: number
}

// 에러 타입
export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'FetchError'
  }
}

// 베이스 fetcher
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

// 강의 관련 API 함수들
export const courseFetcher = {
  // 전체 강의 목록 조회
  getAll: async (): Promise<Course[]> => {
    // TODO: 실제 API로 교체
    // return baseFetch<CoursesResponse>('/api/courses').then(res => res.data);

    // 현재는 mock 데이터 반환 (로딩 시뮬레이션)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return mockCoursesData
  },

  // 카테고리별 강의 조회
  getByCategory: async (category: string): Promise<Course[]> => {
    // TODO: 실제 API로 교체
    // return baseFetch<CoursesResponse>(`/api/courses?category=${category}`);

    await new Promise((resolve) => setTimeout(resolve, 800))
    return mockCoursesData.filter((course) => course.category === category)
  },

  // 검색
  search: async (query: string): Promise<Course[]> => {
    // TODO: 실제 API로 교체
    // return baseFetch<CoursesResponse>(`/api/courses/search?q=${query}`);

    await new Promise((resolve) => setTimeout(resolve, 600))
    return mockCoursesData.filter(
      (course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.author.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
    )
  },

  // 추천 강의 조회
  getRecommended: async (limit: number = 6): Promise<Course[]> => {
    // TODO: 실제 API로 교체
    // return baseFetch<CoursesResponse>(`/api/courses/recommended?limit=${limit}`);

    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockCoursesData
      .filter((course) => course.reviewRating >= 4.7)
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit)
  },
}
