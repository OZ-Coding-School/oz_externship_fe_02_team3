import { EmptyState } from '../commons/EmptyState'
import CourseCardWithBookmark from './CourseCardWithBookmark'
import {
  EMPTY_MESSAGES,
  ARIA_LABELS,
  CARD,
  LIST_SETTINGS,
} from '@src/constants/ui'
import type { Course } from '@src/types/course'

interface CourseGridProps {
  courses: Course[]
  onBookmark: (courseId: number, isBookmarked: boolean) => void
}

export default function CourseGrid({ courses, onBookmark }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <EmptyState
        title={EMPTY_MESSAGES.FILTERED_COURSES}
        description="다른 검색어나 필터를 시도해보세요."
        iconType="FILTERED_COURSES"
        iconClassName="stroke-gray-400 w-8 h-8"
        iconContainerClassName="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center"
      />
    )
  }

  return (
    <section aria-label={ARIA_LABELS.COURSE_GRID}>
      <div
        className={`grid gap-6 grid-cols-${LIST_SETTINGS.COURSES_PER_ROW.MOBILE} md:grid-cols-${LIST_SETTINGS.COURSES_PER_ROW.TABLET} lg:grid-cols-${LIST_SETTINGS.COURSES_PER_ROW.DESKTOP} `}
      >
        {courses.map((course: Course) => (
          <div
            key={course.id}
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
