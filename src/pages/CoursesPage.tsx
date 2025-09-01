// src/pages/CoursesPage.tsx

import { useState, useMemo } from 'react'
import { ChevronDown, FolderIcon } from 'lucide-react'
import Card from '@components/Card'
import DropDown from '@components/DropDown'
import { mockCoursesData, categories, type Course } from '../mock/coursesData'
import {
  LIST_SETTINGS,
  FILTER_SORT,
  EMPTY_MESSAGES,
  BUTTON_TEXT,
  LOADING_MESSAGES,
  LIST_MESSAGES,
  ERROR_MESSAGES,
  CARD,
} from '../constants/ui'

// 정렬 함수들
const sortCourses = (courses: Course[], sortBy: string): Course[] => {
  const sortedCourses = [...courses]

  switch (sortBy) {
    case FILTER_SORT.SORT_OPTIONS.LATEST:
      return sortedCourses.sort((a, b) => b.id - a.id)
    case FILTER_SORT.SORT_OPTIONS.PRICE_LOW:
      return sortedCourses.sort((a, b) => a.price - b.price)
    case FILTER_SORT.SORT_OPTIONS.PRICE_HIGH:
      return sortedCourses.sort((a, b) => b.price - a.price)
    case FILTER_SORT.SORT_OPTIONS.RATING:
      return sortedCourses.sort((a, b) => b.reviewRating - a.reviewRating)
    case FILTER_SORT.SORT_OPTIONS.POPULARITY:
    default:
      return sortedCourses.sort((a, b) => b.reviewCount - a.reviewCount)
  }
}

interface CoursesPageProps {
  title?: string
  subtitle?: string
  isLoading?: boolean
  error?: string | null
}

const CoursesPage = ({
  title = 'IT 강의 목록',
  subtitle = '개발자를 위한 최고의 강의들을 만나보세요',
  isLoading = false,
  error = null,
}: CoursesPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    FILTER_SORT.DEFAULT_CATEGORY
  )
  const [sortBy, setSortBy] = useState<string>(FILTER_SORT.DEFAULT_SORT)
  const [displayedCount, setDisplayedCount] = useState(
    LIST_SETTINGS.PREVIEW_ITEMS
  )
  const [courses] = useState<Course[]>(mockCoursesData)

  // 필터링 및 정렬된 강의 목록
  const processedCourses = useMemo(() => {
    const filtered =
      selectedCategory === FILTER_SORT.DEFAULT_CATEGORY
        ? courses
        : courses.filter((course) => course.category === selectedCategory)

    return sortCourses(filtered, sortBy)
  }, [courses, selectedCategory, sortBy])

  // 현재 표시할 강의 목록
  const displayedCourses = processedCourses.slice(0, displayedCount)
  const hasMore = displayedCount < processedCourses.length

  // 더 보기 핸들러
  const handleLoadMore = () => {
    const nextCount = Math.min(
      displayedCount + LIST_SETTINGS.ITEMS_PER_PAGE,
      processedCourses.length
    )
    setDisplayedCount(nextCount)
  }

  // 정렬 변경 핸들러
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
    setDisplayedCount(LIST_SETTINGS.PREVIEW_ITEMS) // 정렬 변경시 초기화
  }

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setDisplayedCount(LIST_SETTINGS.PREVIEW_ITEMS) // 카테고리 변경시 초기화
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="mb-4 text-red-600">{ERROR_MESSAGES.LOAD_COURSES}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-white"
          >
            {BUTTON_TEXT.RETRY}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 페이지 헤더 */}
      <div className="border-b border-gray-200 bg-white px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* 필터 영역 */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <DropDown
              dropdownTitle={selectedCategory}
              leftIcon={FolderIcon}
              rightIcon={ChevronDown}
            />
            {/* 카테고리 탭들 */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${CARD.TRANSITION} ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 강의 목록 */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              {LIST_MESSAGES.SHOWING_RESULTS(
                displayedCourses.length,
                processedCourses.length
              )}
            </p>
            <div className="flex gap-2">
              {Object.entries({
                [FILTER_SORT.SORT_OPTIONS.POPULARITY]: '인기순',
                [FILTER_SORT.SORT_OPTIONS.LATEST]: '최신순',
                [FILTER_SORT.SORT_OPTIONS.PRICE_LOW]: '가격낮은순',
                [FILTER_SORT.SORT_OPTIONS.RATING]: '평점높은순',
              }).map(([value, label], index, array) => (
                <span key={value} className="flex items-center">
                  <button
                    onClick={() => handleSortChange(value)}
                    className={`text-sm transition-colors ${
                      sortBy === value
                        ? 'text-primary-600 font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                  {index < array.length - 1 && (
                    <span className="mx-2 text-gray-300">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* 로딩 상태 */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-500">{LOADING_MESSAGES.COURSES}</p>
            </div>
          ) : displayedCourses.length === 0 ? (
            /* 빈 상태 */
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-500">
                {selectedCategory === FILTER_SORT.DEFAULT_CATEGORY
                  ? EMPTY_MESSAGES.COURSES
                  : EMPTY_MESSAGES.FILTERED_COURSES}
              </p>
            </div>
          ) : (
            <>
              {/* 강의 카드 그리드 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`${CARD.HOVER_SCALE} ${CARD.TRANSITION}`}
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
              <div className="mt-12 flex justify-center">
                {hasMore ? (
                  <button
                    onClick={handleLoadMore}
                    className={`rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 hover:bg-gray-50 ${CARD.TRANSITION}`}
                  >
                    {BUTTON_TEXT.LOAD_MORE}
                  </button>
                ) : (
                  processedCourses.length > LIST_SETTINGS.PREVIEW_ITEMS && (
                    <p className="text-sm text-gray-500">
                      {LIST_MESSAGES.NO_MORE}
                    </p>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
