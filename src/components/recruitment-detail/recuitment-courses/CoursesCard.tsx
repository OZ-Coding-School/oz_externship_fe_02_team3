import type { CourseCardData } from '@src/mock/postDetailCourses'
import { ArrowRight as ArrowRightIcon } from 'lucide-react'

export interface CourseCardProps {
  course: CourseCardData
}

export default function CoursesCard({ course }: CourseCardProps) {
  return (
    <div className="overflow-hidden rounded border border-gray-200">
      <img
        src="https://placehold.co/120x70?text=ex"
        alt="강의 이미지"
        className="h-48 w-full object-cover"
      />
      <div className="p-6">
        <h5 className="mb-2 text-lg font-semibold">{course.name}</h5>
        <p className="mb-3 text-gray-600">강사: {course.instructor}</p>
        <div className="text-primary-600 flex items-center justify-between">
          <h4 className="text-xl font-semibold">{course.price}</h4>
          <a href={course.url} className="flex items-center hover:underline">
            강의 보기 <ArrowRightIcon className="h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
