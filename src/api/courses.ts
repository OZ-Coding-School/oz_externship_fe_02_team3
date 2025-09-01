import { api } from './axios'
import type { CoursesQuery, PaginatedResponse, Course } from '@src/types/course'

export async function fetchCourses(params: CoursesQuery) {
  const { data } = await api.get<PaginatedResponse<Course>>('/courses', {
    params,
  })
  return data
}
