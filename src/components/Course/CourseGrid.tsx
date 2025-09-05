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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course: Course) => (
        <div
          key={course.id}
          className="transition-all duration-200 hover:scale-105"
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
