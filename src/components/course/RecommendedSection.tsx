import React from 'react'
import { SectionHeader } from './SectionHeader'
import CourseCardWithBookmark from './CourseCardWithBookmark'
import { CARD, LIST_SETTINGS } from '@src/constants/ui'
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

      <div
        className={`grid gap-6 grid-cols-${LIST_SETTINGS.COURSES_PER_ROW.MOBILE} md:grid-cols-${LIST_SETTINGS.COURSES_PER_ROW.TABLET} lg:grid-cols-${LIST_SETTINGS.COURSES_PER_ROW.DESKTOP} `}
      >
        {visibleCourses.map((course: Course) => (
          <div
            key={`recommended-${course.id}`}
            className={`${CARD.TRANSITION} ${CARD.HOVER_SCALE}`}
            style={{ minHeight: `${CARD.MIN_HEIGHT}px` }}
          >
            <CourseCardWithBookmark
              cardTitle={
                course.title.length > LIST_SETTINGS.MAX_TITLE_LENGTH
                  ? `${course.title.substring(0, LIST_SETTINGS.MAX_TITLE_LENGTH)}...`
                  : course.title
              }
              author={course.instructor ?? '미정'}
              cardDescription={
                course.description &&
                course.description.length > LIST_SETTINGS.MAX_DESCRIPTION_LENGTH
                  ? `${course.description.substring(0, LIST_SETTINGS.MAX_DESCRIPTION_LENGTH)}...`
                  : course.description || ''
              }
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
