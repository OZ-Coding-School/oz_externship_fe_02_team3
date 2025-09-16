import CoursesCard from './CoursesCard'
import { postDetailCourseData } from '@src/mock/postDetailCourses'

export default function RecuitmentCourses() {
  const coursesForCard = postDetailCourseData.map((course) => ({
    id: course.id,
    name: course.name,
    instructor: course.instructor,
    price: course.price,
    url: course.url,
  }))

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-8">
      <h3 className="mb-4 pb-6 text-2xl font-bold">스터디 강의 목록</h3>
      <div className="grid grid-cols-2 gap-6">
        {coursesForCard.map((course) => (
          <CoursesCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
