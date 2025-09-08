// 카테고리 상수
export const CATEGORIES = {
  ALL: '전체',
  FRONTEND: '프론트엔드',
  JAVASCRIPT: 'JavaScript',
  REACT: 'React',
  BACKEND: '백엔드',
  CLOUD: '클라우드',
  DEVOPS: 'DevOps',
  DATA_ANALYSIS: '데이터분석',
  DATA_SCIENCE: '데이터사이언스',
  GAME_DEV: '게임개발',
} as const

// 정렬 옵션
export const SORT_OPTIONS = {
  POPULARITY: 'popularity',
  LATEST: 'latest',
  PRICE_LOW: 'price_low',
  RATING: 'rating',
} as const

export const SORT_LABELS = {
  [SORT_OPTIONS.POPULARITY]: '인기순',
  [SORT_OPTIONS.LATEST]: '최신순',
  [SORT_OPTIONS.PRICE_LOW]: '가격낮은순',
  [SORT_OPTIONS.RATING]: '평점높은순',
} as const

// 카테고리 배열 (드롭다운용)
export const CATEGORY_LIST = Object.values(CATEGORIES)

// 페이지네이션 설정
export const PAGINATION = {
  INITIAL_COUNT: 6,
  LOAD_MORE_COUNT: 6,
  RECOMMENDED_COUNT: 6,
  RECOMMENDED_VISIBLE: 3,
} as const
