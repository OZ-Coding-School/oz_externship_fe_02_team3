import { useState, useCallback } from 'react'
import type { UseBookmarkReturn } from '@src/types/hooks'

export const useBookmark = (): UseBookmarkReturn => {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set())

  const toggleBookmark = useCallback(
    (courseId: number, isBookmarked: boolean): void => {
      // TODO: API 호출 로직
      console.log(`Course ${courseId} bookmark status: ${isBookmarked}`)

      setBookmarkedIds((prev) => {
        const newSet = new Set(prev)
        if (isBookmarked) {
          newSet.add(courseId)
        } else {
          newSet.delete(courseId)
        }
        return newSet
      })

      // 실제 구현 시 API 호출
      // if (isBookmarked) {
      //   await bookmarkAPI.add(courseId)
      // } else {
      //   await bookmarkAPI.remove(courseId)
      // }
    },
    []
  )

  const isBookmarked = useCallback(
    (courseId: number): boolean => bookmarkedIds.has(courseId),
    [bookmarkedIds]
  )

  return {
    toggleBookmark,
    isBookmarked,
    bookmarkedCount: bookmarkedIds.size,
  }
}
