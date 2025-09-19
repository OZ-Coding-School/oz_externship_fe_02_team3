import { useState } from 'react'
import { Bookmark } from 'lucide-react'
import { cn } from '@src/utils/cn'

interface BookmarkButtonProps {
  courseId: number
  initialBookmarkedState?: boolean
  onBookmarkToggle?: (courseId: number, isBookmarked: boolean) => void
  className?: string
}

export function BookmarkButton({
  courseId,
  initialBookmarkedState = false,
  onBookmarkToggle,
  className,
}: BookmarkButtonProps) {
  const [isCurrentlyBookmarked, setIsCurrentlyBookmarked] = useState(
    initialBookmarkedState
  )

  const handleBookmarkToggle = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const newBookmarkState = !isCurrentlyBookmarked
    setIsCurrentlyBookmarked(newBookmarkState)
    onBookmarkToggle?.(courseId, newBookmarkState)
  }

  return (
    <button
      type="button"
      onClick={handleBookmarkToggle}
      aria-label={isCurrentlyBookmarked ? '북마크 제거' : '북마크 추가'}
      className={cn(
        'focus:ring-primary-500 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-sm transition-all hover:scale-105 hover:bg-white focus:ring-2 focus:ring-offset-2 focus:outline-none',
        className
      )}
    >
      <Bookmark
        className={cn(
          'h-5 w-5 transition-colors',
          isCurrentlyBookmarked
            ? 'fill-primary-500 stroke-primary-500'
            : 'stroke-gray-600 hover:stroke-gray-800'
        )}
      />
    </button>
  )
}
