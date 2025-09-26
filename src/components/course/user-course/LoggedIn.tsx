import { mockCoursesData } from '@src/mock/coursesData'
import type { Course } from '@src/types/course'
import { cn } from '@src/utils/cn'
import CourseCard from '../course-content/CourseCard'
interface LoggedInProps {
  userStyle: string
}

export default function LoggedIn({ userStyle }: LoggedInProps) {
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendedCourses.map((course) => (
          <article
            key={course.id}
            className={cn('relative w-full cursor-pointer overflow-hidden')}
          >
            <CourseCard {...course} />
          </article>
        ))}
      </div>
    </div>
  )
}
