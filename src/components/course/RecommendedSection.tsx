import React from 'react'
import { SectionHeader } from './SectionHeader'
import CourseCardWithBookmark from './CourseCardWithBookmark'
import type { Course } from '@src/types/course'

interface RecommendedSectionProps {
  visibleCourses: Course[]
  canGoLeft: boolean
  canGoRight: boolean
  goLeft: () => void
  goRight: () => void
  onBookmark: (courseId: number, isBookmarked: boolean) => void
}

export default function RecommendedSection({
  visibleCourses,
  canGoLeft,
  canGoRight,
  goLeft,
  goRight,
  onBookmark,
}: RecommendedSectionProps) {
  return (
    <section className="mb-12" aria-labelledby="recommended-courses-title">
      <SectionHeader
        title="추천 강의"
        showNavigation
        canNavigateLeft={canGoLeft}
        canNavigateRight={canGoRight}
        onNavigateLeft={goLeft}
        onNavigateRight={goRight}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleCourses.map((course: Course) => (
          <div
            key={`recommended-${course.id}`}
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
    </section>
  )
}
