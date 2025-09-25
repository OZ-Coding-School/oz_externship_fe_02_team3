import type { Course } from '@src/types/course'
import { ARIA_LABELS } from '@src/constants/ui'
import CourseCard from './CourseCard'
interface CourseListProps {
  courses: Course[]
  onBookmark: (courseId: number, isBookmarked: boolean) => void
}

export default function CourseList({ courses, onBookmark }: CourseListProps) {
  return (
    <section
      aria-label={ARIA_LABELS.COURSE_GRID}
      className="grid grid-cols-1 gap-4 px-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {courses.map((course: Course) => (
        <div
          key={course.id}
          className="w-full min-w-0 transition-all duration-200 hover:scale-105"
        >
          <CourseCard {...course} onBookmarkClick={onBookmark} />
        </div>
      ))}
    </section>
  )
}
