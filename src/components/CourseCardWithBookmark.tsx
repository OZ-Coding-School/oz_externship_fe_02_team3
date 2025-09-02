import { useState } from 'react'
import { Bookmark } from 'lucide-react'
import Card from '@components/Card'

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
}

const CourseCardWithBookmark = ({
  courseId,
  onBookmarkClick,
  ...cardProps
}: CourseCardWithBookmarkProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const newBookmarkState = !isBookmarked
    setIsBookmarked(newBookmarkState)

    if (onBookmarkClick) {
      onBookmarkClick(courseId, newBookmarkState)
    }
  }

  return (
    <div className="relative">
      {/* 기존 Card 컴포넌트 */}
      <Card {...cardProps} />

      {/* 북마크 버튼 오버레이 */}
      <div className="absolute top-3 right-3">
        <button
          onClick={handleBookmarkClick}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
        >
          <div className="flex h-[28px] w-[18.77px] items-center justify-center">
            <Bookmark
              className={`transition-colors ${
                isBookmarked
                  ? 'stroke-primary-500 fill-primary-500'
                  : 'stroke-gray-600'
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  )
}

export default CourseCardWithBookmark
