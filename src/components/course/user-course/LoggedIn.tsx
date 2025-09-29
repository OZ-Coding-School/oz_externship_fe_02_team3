import { mockCoursesData } from '@src/mock/coursesData'
import type { Course } from '@src/types/course'
import { cn } from '@src/utils/cn'
import CourseCard from '../course-content/CourseCard'
import { SCROLLBAR_STYLES } from '@src/constants/ui'
import { useHorizontalScroll } from '@src/hooks/useHorizontalScroll'
interface LoggedInProps {
  userStyle: string
}

export default function LoggedIn({ userStyle }: LoggedInProps) {
  const { ref } = useHorizontalScroll()
  const userName = '김개발'

  const recommendedCourses: Course[] = mockCoursesData
    .filter((course) => (course.rating ?? course.reviewRating) >= 4.8)
    .sort((a, b) => (b.rating ?? b.reviewRating) - (a.rating ?? a.reviewRating))
    .slice(0, 3)

  return (
    <div className={`max-w-[1306px] px-11 ${userStyle}`}>
      <div className="mb-6 flex items-center">
        <div className="mr-6 text-xl font-semibold">
          <span className="text-primary-600">{userName} </span>
          <span className="text-gray-800/80">님을 위한 맞춤 강의 추천</span>
        </div>
        <div className="rounded bg-[#EA580C] px-2 py-1 text-sm text-white">
          개인화 추천
        </div>
      </div>
      <div
        ref={ref}
        className={cn(
          'overflow-x-auto overflow-y-hidden pt-2 pb-4',
          SCROLLBAR_STYLES
        )}
      >
        <div className="flex gap-6">
          {recommendedCourses.map((course) => (
            <article
              key={course.id}
              className={cn(
                'relative w-full min-w-[330px] cursor-pointer overflow-hidden'
              )}
            >
              <CourseCard {...course} />
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
