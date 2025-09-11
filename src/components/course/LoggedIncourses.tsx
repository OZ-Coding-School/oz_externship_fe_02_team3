import CourseCardWithBookmark from './CourseCardWithBookmark'
import { mockCoursesData, type Course } from '@src/types/course'

export default function LoggedInCourses() {
  const userName = '김개발'

  const recommendedCourses: Course[] = mockCoursesData
    .filter((course) => (course.rating ?? course.reviewRating) >= 4.8)
    .sort((a, b) => (b.rating ?? b.reviewRating) - (a.rating ?? a.reviewRating))
    .slice(0, 3)

  return (
    <div className="w-full">
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
          <div key={course.id} className="rounded-lg bg-white p-4 shadow-sm">
            <CourseCardWithBookmark
              cardTitle={course.title}
              author={course.instructor ?? course.author}
              cardDescription={course.description}
              reviewRating={course.rating ?? course.reviewRating}
              reviewCount={course.reviewCount}
              originalPrice={course.originalPrice}
              price={course.price}
              courseId={course.id}
              onBookmarkClick={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
