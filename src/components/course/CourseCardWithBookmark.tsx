import CourseCard from './CourseCard'
import { BookmarkButton } from './BookmarkButton'
import { cn } from '@src/utils/cn'

interface CourseCardWithBookmarkProps {
  cardTitle: string
  author: string
  cardDescription: string
  reviewRating: number
  reviewCount: number
  originalPrice: number
  price: number
  courseId: number
  onBookmarkClick?: (courseId: number, isBookmarked: boolean) => void
  className?: string
}

function CourseCardWithBookmark({
  courseId,
  onBookmarkClick,
  className,
  ...cardProps
}: CourseCardWithBookmarkProps) {
  return (
    <article
      className={cn(
        'relative w-full cursor-pointer overflow-hidden',
        'mx-auto max-w-sm min-w-[280px]',
        className
      )}
    >
      <CourseCard {...cardProps} />
      <div className="pointer-events-auto absolute top-2 right-2 z-10 sm:top-3 sm:right-3">
        <BookmarkButton
          courseId={courseId}
          onBookmarkToggle={onBookmarkClick}
          className="h-8 w-8 sm:h-10 sm:w-10"
        />
      </div>
    </article>
  )
}

export default CourseCardWithBookmark
