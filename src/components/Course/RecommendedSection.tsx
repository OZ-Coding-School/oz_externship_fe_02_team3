import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@src/utils/cn'
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
    <div className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">추천 강의</h2>
        <div className="flex gap-2">
          <button
            onClick={goLeft}
            disabled={!canGoLeft}
            className={cn(
              'rounded-full border p-2 transition-colors',
              canGoLeft
                ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'cursor-not-allowed border-gray-200 text-gray-400'
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goRight}
            disabled={!canGoRight}
            className={cn(
              'rounded-full border p-2 transition-colors',
              canGoRight
                ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'cursor-not-allowed border-gray-200 text-gray-400'
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleCourses.map((course: Course) => (
          <div
            key={`recommended-${course.id}`}
            className="transition-all duration-200 hover:scale-105"
          >
            <CourseCardWithBookmark
              cardTitle={course.title}
              instructor={course.instructor}
              cardDescription={course.description}
              rating={course.rating}
              reviewCount={course.reviewCount}
              originalPrice={course.originalPrice}
              price={course.price}
              thumbnailUrl={course.thumbnailUrl}
              provider={course.provider}
              courseId={course.id}
              onBookmarkClick={onBookmark}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
