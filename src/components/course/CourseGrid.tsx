import React from 'react'
import CourseCardWithBookmark from './CourseCardWithBookmark'
import { EmptyState } from './EmptyState'
import type { Course } from '@src/types/course'

interface CourseGridProps {
  courses: Course[]
  onBookmark: (courseId: number, isBookmarked: boolean) => void
}

export default function CourseGrid({ courses, onBookmark }: CourseGridProps) {
  if (courses.length === 0) {
    return <EmptyState />
  }

  return (
    <div
      className={
        // 반응형 그리드 + 최소 카드 크기 보장
        'grid gap-6 ' +
        'grid-cols-1' + // 모바일: 1열
        'sm:grid-cols-2' + // 작은 화면: 2열
        'lg:grid-cols-3' + // 큰 화면: 3열
        'auto-rows-fr' // 모든 행 높이 동일
      }
    >
      {courses.map((course: Course) => (
        <div
          key={course.id}
          className={
            'transition-all duration-200 hover:scale-105 ' +
            'min-w-0' + // flex-shrink 방지
            'w-full' + // 전체 너비 사용
            'mx-auto max-w-sm' // 최대 너비 제한 + 중앙 정렬
          }
        >
          <CourseCardWithBookmark
            cardTitle={course.title}
            author={course.instructor ?? '미정'}
            cardDescription={course.description}
            reviewRating={course.rating ?? 0}
            reviewCount={course.reviewCount ?? 0}
            originalPrice={course.originalPrice ?? course.price ?? 0}
            price={course.price ?? 0}
            courseId={course.id}
            onBookmarkClick={onBookmark}
          />
        </div>
      ))}
    </div>
  )
}
