import { useState, useMemo, useEffect } from 'react'
import {
  ChevronDown,
  FolderIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Card from '@components/Card'
import {
  mockCoursesData,
  categories,
  getRecommendedCourses,
  type Course,
} from '../mock/coursesData'

// 정렬 옵션 정의
const SORT_OPTIONS = {
  POPULARITY: 'popularity',
  LATEST: 'latest',
  PRICE_LOW: 'price_low',
  RATING: 'rating',
} as const

const SORT_LABELS = {
  [SORT_OPTIONS.POPULARITY]: '인기순',
  [SORT_OPTIONS.LATEST]: '최신순',
  [SORT_OPTIONS.PRICE_LOW]: '가격낮은순',
  [SORT_OPTIONS.RATING]: '평점높은순',
}

// any 대신 정확한 타입 정의
interface IconProps {
  className?: string
}

type IconComponent = React.ComponentType<IconProps>

// 드롭다운 컴포넌트 - any 제거
interface SimpleDropDownProps {
  options: string[]
  selected: string
  onSelect: (value: string) => void
  leftIcon?: IconComponent // any 대신 구체적 타입
}

const SimpleDropDown = ({
  options,
  selected,
  onSelect,
  leftIcon: LeftIcon,
}: SimpleDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[38px] items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 transition-colors hover:bg-gray-50"
      >
        {LeftIcon && <LeftIcon className="h-4 w-4 text-gray-400" />}
        <span className="text-sm text-gray-700">{selected}</span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option)
                setIsOpen(false)
              }}
              className="w-full px-3 py-2 text-left text-sm first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// 정렬 함수
const sortCourses = (courses: Course[], sortBy: string): Course[] => {
  const sortedCourses = [...courses]

  switch (sortBy) {
    case SORT_OPTIONS.LATEST:
      return sortedCourses.sort((a, b) => b.id - a.id)
    case SORT_OPTIONS.PRICE_LOW:
      return sortedCourses.sort((a, b) => a.price - b.price)
    case SORT_OPTIONS.RATING:
      return sortedCourses.sort((a, b) => b.reviewRating - a.reviewRating)
    case SORT_OPTIONS.POPULARITY:
    default:
      return sortedCourses.sort((a, b) => b.reviewCount - a.reviewCount)
  }
}

// API 관련 함수들 (나중에 실제 API로 교체)
const fetchCourses = async (): Promise<Course[]> => {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch('/api/courses');
  // return response.json();

  // 현재는 mock 데이터 반환 (로딩 시뮬레이션)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCoursesData
}

interface CoursesPageProps {
  // props 정의 (필요시 확장)
  className?: string
}

const CoursesPage = ({ className }: CoursesPageProps = {}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체')
  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS.POPULARITY)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [displayedCount, setDisplayedCount] = useState(6)

  // API 연동을 위한 상태들
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 추천 강의 상태
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([])
  const [currentRecommendedIndex, setCurrentRecommendedIndex] = useState(0)

  // 컴포넌트 마운트 시 데이터 로딩
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchCourses()
        setCourses(data)

        // 추천 강의 설정
        const recommended = getRecommendedCourses(data, 6)
        setRecommendedCourses(recommended)
      } catch (err) {
        setError('강의 목록을 불러오는데 실패했습니다.')
        console.error('Failed to fetch courses:', err)
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, []) // 빈 배열이므로 컴포넌트 마운트 시 한 번만 실행

  // 검색 필터링 함수
  const filterBySearch = (courses: Course[], query: string): Course[] => {
    if (!query.trim()) return courses

    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.author.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  // 필터링 및 정렬된 강의 목록
  const processedCourses = useMemo(() => {
    let filtered = courses

    // 검색 필터링
    filtered = filterBySearch(filtered, searchQuery)

    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      )
    }

    // 정렬
    return sortCourses(filtered, sortBy)
  }, [courses, selectedCategory, sortBy, searchQuery])

  // 현재 표시할 강의 목록
  const displayedCourses = processedCourses.slice(0, displayedCount)
  const hasMore = displayedCount < processedCourses.length

  // 더 보기 핸들러
  const handleLoadMore = () => {
    setDisplayedCount((prev) => Math.min(prev + 6, processedCourses.length))
  }

  // 추천 강의 표시용 (한 번에 3개씩)
  const visibleRecommended = recommendedCourses.slice(
    currentRecommendedIndex,
    currentRecommendedIndex + 3
  )
  const canGoLeft = currentRecommendedIndex > 0
  const canGoRight = currentRecommendedIndex + 3 < recommendedCourses.length

  // 추천 강의 네비게이션
  const handleRecommendedNav = (direction: 'left' | 'right') => {
    if (direction === 'left' && canGoLeft) {
      setCurrentRecommendedIndex((prev) => Math.max(0, prev - 3))
    } else if (direction === 'right' && canGoRight) {
      setCurrentRecommendedIndex((prev) =>
        Math.min(prev + 3, recommendedCourses.length - 3)
      )
    }
  }

  // 로딩 상태
  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${className || ''}`}>
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">강의 목록을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className={`min-h-screen bg-gray-50 ${className || ''}`}>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="mb-4 text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-white"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className || ''}`}>
      {/* 페이지 헤더 */}
      <div className="border-b border-gray-200 bg-white px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            IT 강의 목록
          </h1>
          <p className="text-gray-600">
            개발자를 위한 최고의 강의들을 만나보세요
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* 추천 강의 섹션 */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">추천 강의</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleRecommendedNav('left')}
                disabled={!canGoLeft}
                className={`rounded-full border p-2 ${
                  canGoLeft
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    : 'cursor-not-allowed border-gray-200 text-gray-400'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleRecommendedNav('right')}
                disabled={!canGoRight}
                className={`rounded-full border p-2 ${
                  canGoRight
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    : 'cursor-not-allowed border-gray-200 text-gray-400'
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 추천 강의 가로 스크롤 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleRecommended.map((course) => (
              <div
                key={`recommended-${course.id}`}
                className="transition-all duration-200 hover:scale-105"
              >
                <Card
                  cardTitle={course.title}
                  author={course.author}
                  cardDescription={course.description}
                  reviewRating={course.reviewRating}
                  reviewCount={course.reviewCount}
                  originalPrice={course.originalPrice}
                  price={course.price}
                />
              </div>
            ))}
          </div>
        </div>
        {/* 검색 및 필터 영역 */}
        <div className="mb-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {/* 검색바 */}
            <div className="min-w-0 flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="강의를 검색해보세요..."
                  className="focus:ring-primary-500 focus:border-primary-500 h-[38px] w-full rounded-lg border border-gray-300 pr-10 pl-4 text-sm focus:ring-2 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 드롭다운들 */}
            <div className="flex gap-3">
              <SimpleDropDown
                options={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                leftIcon={FolderIcon}
              />

              <SimpleDropDown
                options={Object.values(SORT_LABELS)}
                selected={SORT_LABELS[sortBy as keyof typeof SORT_LABELS]}
                onSelect={(label) => {
                  const sortValue =
                    Object.keys(SORT_LABELS).find(
                      (key) =>
                        SORT_LABELS[key as keyof typeof SORT_LABELS] === label
                    ) || SORT_OPTIONS.POPULARITY
                  setSortBy(sortValue)
                }}
              />
            </div>
          </div>
        </div>

        {/* 강의 목록 */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              {displayedCourses.length}개 표시 / 총 {processedCourses.length}개
              {searchQuery && (
                <span className="text-primary-600 ml-2">
                  {searchQuery} 검색 결과
                </span>
              )}
            </p>
          </div>

          {displayedCourses.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <>
              {/* 강의 카드 그리드 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <Card
                      cardTitle={course.title}
                      author={course.author}
                      cardDescription={course.description}
                      reviewRating={course.reviewRating}
                      reviewCount={course.reviewCount}
                      originalPrice={course.originalPrice}
                      price={course.price}
                    />
                  </div>
                ))}
              </div>

              {/* 더 보기 버튼 */}
              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    더 보기
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
