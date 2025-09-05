import Card from '@components/Card'
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

const CourseCardWithBookmark = ({
  courseId,
  onBookmarkClick,
  className,
  ...cardProps
}: CourseCardWithBookmarkProps) => {
  return (
    <article className={cn('relative cursor-pointer', className)}>
      <Card {...cardProps} />

      <div className="absolute top-3 right-3">
        <BookmarkButton
          courseId={courseId}
          onBookmarkToggle={onBookmarkClick}
        />
      </div>
    </article>
  )
}

export default CourseCardWithBookmark
