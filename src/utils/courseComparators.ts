import { FILTER_SORT } from '@src/constants/ui'
import type { Course } from '@src/types/course'

export const COURSE_COMPARATORS: Record<
  string,
  (a: Course, b: Course) => number
> = {
  [FILTER_SORT.SORT_OPTIONS.POPULARITY]: (a: Course, b: Course) => {
    const aPopularity = (a.rating ?? 0) * (a.reviewCount ?? 0)
    const bPopularity = (b.rating ?? 0) * (b.reviewCount ?? 0)
    return bPopularity - aPopularity
  },

  [FILTER_SORT.SORT_OPTIONS.LATEST]: (a: Course, b: Course) => {
    return b.id - a.id
  },

  [FILTER_SORT.SORT_OPTIONS.PRICE_LOW]: (a: Course, b: Course) => {
    const aPrice = a.price ?? 0
    const bPrice = b.price ?? 0
    return aPrice - bPrice
  },

  [FILTER_SORT.SORT_OPTIONS.PRICE_HIGH]: (a: Course, b: Course) => {
    const aPrice = a.price ?? 0
    const bPrice = b.price ?? 0
    return bPrice - aPrice
  },

  // 평점순 (높은 평점부터)
  [FILTER_SORT.SORT_OPTIONS.RATING]: (a: Course, b: Course) => {
    const aRating = a.rating ?? 0
    const bRating = b.rating ?? 0

    // 평점이 같으면 리뷰 수로 2차 정렬
    if (bRating === aRating) {
      return (b.reviewCount ?? 0) - (a.reviewCount ?? 0)
    }

    return bRating - aRating
  },
}

// 기본 정렬 함수 (인기순)
export const getDefaultComparator = () => {
  return COURSE_COMPARATORS[FILTER_SORT.DEFAULT_SORT]
}

// 정렬 키에 따른 comparator 반환
export const getComparatorBySortKey = (sortKey: string) => {
  return COURSE_COMPARATORS[sortKey] ?? getDefaultComparator()
}
