import React from 'react'
import CourseCardWithBookmark from '@src/components/Course/CourseCardWithBookmark'
import type { Course } from '@src/types/course'

interface CourseGridProps {
  courses: Course[]
  onBookmark: (courseId: number, isBookmarked: boolean) => void
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, onBookmark }) => {
  if (courses.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-4 text-6xl text-gray-400">📚</div>
          <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
          <p className="mt-2 text-sm text-gray-400">
            다른 검색어나 필터를 시도해보세요.
          </p>
        </div>
      </div>
    )
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
            author={course.author}
            cardDescription={course.description}
            reviewRating={course.reviewRating}
            reviewCount={course.reviewCount}
            originalPrice={course.originalPrice}
            price={course.price}
            courseId={course.id}
            onBookmarkClick={onBookmark}
          />
        </div>
      ))}
    </div>
  )
}
