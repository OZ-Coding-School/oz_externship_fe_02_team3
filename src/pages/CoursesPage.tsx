import { useState } from 'react'
import { ChevronDown, FolderIcon } from 'lucide-react'
import Card from '@components/Card'
import DropDown from '@components/DropDown'
import { mockCoursesData, categories, type Course } from '../mock/coursesData'

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [courses] = useState<Course[]>(mockCoursesData)

  // 카테고리별 필터링
  const filteredCourses =
    selectedCategory === '전체'
      ? courses
      : courses.filter((course) => course.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
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
        {/* 필터 영역 */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <DropDown
              dropdownTitle={selectedCategory}
              leftIcon={FolderIcon}
              rightIcon={ChevronDown}
            />
            {/* 카테고리 탭들 (선택사항 - 드롭다운 대신 탭으로 표시하고 싶다면) */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
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
              총{' '}
              <span className="font-semibold text-gray-900">
                {filteredCourses.length}
              </span>
              개의 강의
            </p>
            <div className="flex gap-2">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                인기순
              </button>
              <span className="text-gray-300">|</span>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                최신순
              </button>
              <span className="text-gray-300">|</span>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                가격낮은순
              </button>
            </div>
          </div>

          {/* 강의 카드 그리드 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                cardTitle={course.title}
                author={course.author}
                cardDescription={course.description}
                reviewRating={course.reviewRating}
                reviewCount={course.reviewCount}
                originalPrice={course.originalPrice}
                price={course.price}
              />
            ))}
          </div>
        </div>

        {/* 더 보기 버튼 (페이지네이션 대신) */}
        <div className="mt-12 flex justify-center">
          <button className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 transition-colors hover:bg-gray-50">
            더 많은 강의 보기
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
