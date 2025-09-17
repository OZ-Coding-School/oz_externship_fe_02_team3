import { mockCoursesData } from './coursesData'
import type { Course } from '@src/types/course'

export const studyGroupCourseMap: Record<string, number[]> = {
  '스터디 그룹1': [1, 3], // Vue.js, JS ES6+
  '스터디 그룹2': [4, 12], // React 실전, TS 완벽 가이드
  '스터디 그룹3': [6], // Node.js 백엔드
  '스터디 그룹4': [7, 10, 11], // Docker&K8s, Spring, Flutter
}

export const getCoursesForGroup = (groupName?: string): Course[] => {
  if (!groupName) return []
  const ids = studyGroupCourseMap[groupName] ?? []
  return mockCoursesData.filter((c) => ids.includes(c.id))
}

export const sumCoursePrices = (courses: Course[]) =>
  courses.reduce((acc, c) => acc + (c.price ?? 0), 0)

export const fmt = (n: number) => new Intl.NumberFormat('ko-KR').format(n)
