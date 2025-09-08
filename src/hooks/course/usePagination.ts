import { useState, useMemo, useEffect } from 'react'
import { PAGINATION } from '@src/constants/courses'
import type { Course } from '@src/types/course'
import type { UsePaginationReturn } from '@src/types/hooks'

export const usePagination = (
  items: Course[],
  initialCount: number = PAGINATION.INITIAL_COUNT
): UsePaginationReturn => {
  const [displayedCount, setDisplayedCount] = useState<number>(initialCount)

  useEffect(() => {
    setDisplayedCount(initialCount)
  }, [items.length, initialCount])

  const displayedItems = useMemo(
    (): Course[] => items.slice(0, displayedCount),
    [items, displayedCount]
  )

  const hasMore: boolean = displayedCount < items.length

  const loadMore = (): void => {
    setDisplayedCount((prev) =>
      Math.min(prev + PAGINATION.LOAD_MORE_COUNT, items.length)
    )
  }

  const reset = (): void => {
    setDisplayedCount(initialCount)
  }

  return {
    displayedItems,
    hasMore,
    loadMore,
    reset,
    currentCount: displayedCount,
    totalCount: items.length,
  }
}
