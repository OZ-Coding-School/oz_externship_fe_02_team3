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
        'relative cursor-pointer',
        'w-full',
        'overflow-hidden',
        'min-w-0',
        className
      )}
    >
      <CourseCard {...cardProps} />

      {/* 북마크 버튼 컨테이너 */}
      <div
        className={cn('absolute top-2 right-2', 'z-10', 'pointer-events-auto')}
      >
        <BookmarkButton
          courseId={courseId}
          onBookmarkToggle={onBookmarkClick}
        />
      </div>
    </article>
  )
}

export default CourseCardWithBookmark
