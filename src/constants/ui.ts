import {
  AlertTriangle,
  BookOpen,
  Search,
  AlertCircle,
  XCircle,
  Inbox as NoDataIcon,
  type LucideIcon,
} from 'lucide-react'

// 페이지네이션 설정
export const PAGINATION = {
  MAX_VISIBLE_PAGES: 5, // 한 번에 보여줄 페이지 번호 개수
  DEFAULT_PAGE: 1 as number, // 기본 페이지
  DEFAULT_TOTAL_PAGES: {
    COURSES: 10 as number, // 강의 기본 총 페이지 수
    POSTS: 5 as number, // 게시글 기본 총 페이지 수
    BOOKMARKS: 4 as number, // 북마크 기본 총 페이지 수
  },
} as const

// 리스트 관련 설정
export const LIST_SETTINGS = {
  ITEMS_PER_PAGE: 12 as number, // 페이지당 강의 수 (3열 * 4행)
  COURSES_PER_ROW: {
    MOBILE: 1,
    TABLET: 2,
    DESKTOP: 3,
  },

  PREVIEW_ITEMS: 6 as number, // 첫 화면에서 미리보기로 보여줄 강의 수
  MAX_TITLE_LENGTH: 50 as number, // 강의 제목 최대 길이
  MAX_DESCRIPTION_LENGTH: 100 as number, // 강의 설명 최대 길이
} as const

// 필터/정렬 설정
export const FILTER_SORT = {
  DEFAULT_CATEGORY: '전체',
  DEFAULT_SORT: 'popularity', // 'popularity' | 'latest' | 'price_low' | 'price_high' | 'rating'
  SORT_OPTIONS: {
    POPULARITY: 'popularity',
    LATEST: 'latest',
    PRICE_LOW: 'price_low',
    PRICE_HIGH: 'price_high',
    RATING: 'rating',
  },
} as const

// 모달/다이얼로그 설정
export const MODAL = {
  BACKDROP_OPACITY: 0.5, // 모달 배경 투명도 (50%)
  MAX_WIDTH: 'max-w-lg', // 모달 최대 너비 (강의 상세용)
  PADDING: 'p-6', // 모달 내부 패딩
  COURSE_DETAIL_MAX_WIDTH: 'max-w-4xl', // 강의 상세 모달 최대 너비
} as const

// 토스트 설정
export const TOAST = {
  DEFAULT_DURATION: 3000 as number, // 3초
  SUCCESS_DURATION: 3000 as number, // 성공 토스트 지속 시간
  ERROR_DURATION: 5000 as number, // 에러 토스트 지속 시간
  WARNING_DURATION: 4000 as number, // 경고 토스트 지속 시간
} as const

// 시뮬레이션 설정 (개발용)
export const SIMULATION = {
  ERROR_PROBABILITY: 0.1 as number, // 10% 에러 발생 확률
  LOADING_MIN_TIME: 800 as number, // 최소 로딩 시간 (ms)
  LOADING_MAX_TIME: 2000 as number, // 최대 로딩 시간 (ms)
} as const

// 브레이크포인트 관련
export const BREAKPOINTS = {
  SM: 640, // px
  MD: 768, // px
  LG: 1024, // px
  XL: 1280, // px
} as const

// 아이콘 크기
export const ICON_SIZES = {
  SMALL: {
    WIDTH: 4, // w-4 (16px)
    HEIGHT: 4, // h-4 (16px)
  },
  MEDIUM: {
    WIDTH: 6, // w-6 (24px)
    HEIGHT: 6, // h-6 (24px)
  },
  LARGE: {
    WIDTH: 8, // w-8 (32px)
    HEIGHT: 8, // h-8 (32px)
  },
} as const

// 강의 관련 설정
export const COURSE = {
  RATING: {
    MAX: 5,
    MIN: 0,
    DEFAULT: 0,
  },
  PRICE: {
    FREE: 0,
    MIN_PAID: 1000,
    MAX_DISPLAY: 1000000, // 100만원 이상은 별도 표시
  },
  DISCOUNT: {
    MIN_PERCENTAGE: 5, // 최소 할인율
    MAX_PERCENTAGE: 90, // 최대 할인율
  },
  PLATFORM: {
    UDEMY: 'Udemy',
    INFLEARN: '인프런',
    FASTCAMPUS: '패스트캠퍼스',
    COURSERA: 'Coursera',
  },
} as const

// 카드 관련 설정
export const CARD = {
  MIN_HEIGHT: 400, // px - 강의 카드 최소 높이
  MAX_WIDTH: 'max-w-sm', // 강의 카드 최대 너비
  IMAGE_HEIGHT: 200, // px - 강의 썸네일 높이
  HOVER_SCALE: 'hover:scale-105', // 호버 시 확대 효과
  TRANSITION: 'transition-all duration-200', // 애니메이션 지속시간
} as const

// 빈 상태 메시지와 아이콘
export const EMPTY_MESSAGES = {
  COURSES: '등록된 강의가 없습니다.',
  FILTERED_COURSES: '해당 조건의 강의가 없습니다.',
  BOOKMARKS: '북마크한 강의가 없습니다.',
  SEARCH_RESULTS: '검색 결과가 없습니다.',
  NoData: '공고가 없습니다',
  FALLBACK: '데이터가 없습니다.',
} as const

export const EMPTY_STATE_ICONS: Record<
  keyof typeof EMPTY_MESSAGES,
  LucideIcon
> = {
  COURSES: BookOpen,
  FILTERED_COURSES: Search,
  BOOKMARKS: BookOpen,
  SEARCH_RESULTS: Search,
  NoData: NoDataIcon,
  FALLBACK: AlertCircle,
} as const

// 에러 메시지와 아이콘
export const ERROR_MESSAGES = {
  LOAD_COURSES: '강의 목록을 불러오는데 실패했습니다.',
  LOAD_COURSE_DETAIL: '강의 상세 정보를 불러오는데 실패했습니다.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
} as const

export const ERROR_ICONS: Record<keyof typeof ERROR_MESSAGES, LucideIcon> = {
  LOAD_COURSES: AlertTriangle,
  LOAD_COURSE_DETAIL: AlertTriangle,
  NETWORK_ERROR: XCircle,
  SERVER_ERROR: AlertCircle,
  UNKNOWN: AlertTriangle,
} as const

// 에러 관련 UI 텍스트 (아이콘으로 대체)
export const ERROR_UI = {
  DEFAULT_TITLE: '오류가 발생했습니다',
  DEFAULT_ICON: AlertTriangle,
  SEVERITY_ICONS: {
    ERROR: XCircle,
    WARNING: AlertTriangle,
    INFO: AlertCircle,
  },
} as const

// 버튼 텍스트
export const BUTTON_TEXT = {
  LOAD_MORE: '더 보기',
  RETRY: '다시 시도',
  GO_TO_COURSE: '강의보러가기',
  ADD_TO_CART: '장바구니 담기',
  BOOKMARK: '북마크',
  SHARE: '공유하기',
  FILTER: '필터',
  RESET_FILTER: '필터 초기화',
} as const

// 로딩 메시지
export const LOADING_MESSAGES = {
  COURSES: '강의 목록을 불러오는 중…',
  COURSE_DETAIL: '강의 정보를 불러오는 중…',
  FILTERING: '필터링 중…',
} as const

// 성공 메시지
export const SUCCESS_MESSAGES = {
  BOOKMARK_ADDED: '북마크에 추가되었습니다.',
  BOOKMARK_REMOVED: '북마크에서 제거되었습니다.',
  CART_ADDED: '장바구니에 추가되었습니다.',
} as const

// 리스트 상태 메시지
export const LIST_MESSAGES = {
  NO_MORE: '모든 강의를 불러왔습니다.',
  SHOWING_RESULTS: (current: number, total: number) =>
    `${total}개 중 ${current}개 표시`,
} as const

export const NOTIFICATION_TYPE = {
  APPLICATION: 'application',
  APPROVAL: 'approval',
  REJECTION: 'rejection',
  JOIN: 'join',
  STUDY_END: 'study_end',
  REMINDER: 'reminder',
} as const

export const NOTIFICATION_ICON_CONFIG = [
  {
    type: NOTIFICATION_TYPE.APPLICATION,
    bgColor: 'bg-blue-100',
    strokeColor: 'stroke-[#2563EB]',
    icon: 'UserRoundPlus',
  },
  {
    type: NOTIFICATION_TYPE.APPROVAL,
    bgColor: 'bg-green-100',
    strokeColor: 'stroke-[#16A34A]',
    icon: 'Check',
  },
  {
    type: NOTIFICATION_TYPE.REJECTION,
    bgColor: 'bg-red-100',
    strokeColor: 'stroke-[#DC2626]',
    icon: 'X',
  },
  {
    type: NOTIFICATION_TYPE.JOIN,
    bgColor: 'bg-purple-100',
    strokeColor: 'stroke-[#9333EA]',
    icon: 'UsersRound',
  },
  {
    type: NOTIFICATION_TYPE.STUDY_END,
    bgColor: 'bg-orange-100',
    strokeColor: 'stroke-[#EA580C]',
    icon: 'CalendarCheck',
  },
]

export const Z_INDEX = {
  HEADER: 'z-10',
  DROPDOWN: 'z-20',
  MODAL: 'z-30',
  POPUP: 'z-40',
  TOAST: 'z-50',
} as const

export const NAV_ITEMS = [
  { to: '/courses', label: '강의목록' },
  { to: '/study-group', label: '스터디 그룹' },
  { to: '/recruitment', label: '구인 공고' },
]

// 페이지 제목과 설명
export const PAGE_TITLES = {
  COURSES: 'IT 강의 목록',
  STUDY_GROUP: '스터디 그룹',
  RECRUITMENT: '구인 공고',
} as const

export const PAGE_DESCRIPTIONS = {
  COURSES: '개발자를 위한 최고의 강의들을 만나보세요',
  STUDY_GROUP: '함께 성장할 스터디원을 찾아보세요',
  RECRUITMENT: '최신 개발자 채용 공고를 확인하세요',
} as const

// ARIA 레이블
export const ARIA_LABELS = {
  SEARCH_FILTER: '검색 및 필터',
  COURSE_GRID: '강의 목록',
  NAVIGATION: '네비게이션',
} as const

// 통계 텍스트 (CourseStats용)
export const STATS_TEXT = {
  DISPLAYED_COUNT: (count: number) => `${count}개`,
  TOTAL_PREFIX: '표시 / 총',
  TOTAL_COUNT: (count: number) => `${count}개`,
  SEARCH_RESULT_TAG: '검색 결과',
  FILTERED_PREFIX: '전체',
  FILTERED_SUFFIX: '중 필터링됨',
} as const
