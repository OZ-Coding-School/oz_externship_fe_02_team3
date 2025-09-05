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
        'overflow-hidden', // 넘치는 요소들을 숨김
        'min-w-0', // flex-shrink 방지
        className
      )}
    >
      <Card {...cardProps} />

      {/* 북마크 버튼 컨테이너 */}
      <div
        className={cn(
          'absolute top-3 right-3',
          'z-10', // 다른 요소 위에 표시
          'pointer-events-auto' // 클릭 가능하도록
        )}
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
