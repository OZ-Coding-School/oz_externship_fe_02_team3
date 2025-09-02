import { useState } from 'react'
import { ChevronDown, FolderIcon } from 'lucide-react'

interface IconProps {
  className?: string
}

type IconComponent = React.ComponentType<IconProps>

// 드롭다운 컴포넌트
interface SimpleDropDownProps {
  options: string[]
  selected: string
  onSelect: (value: string) => void
  leftIcon?: IconComponent
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
        className="flex h-[38px] w-full items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 transition-colors hover:bg-gray-50"
      >
        {LeftIcon && <LeftIcon className="h-4 w-4 text-gray-400" />}
        <span className="flex-1 text-left text-sm text-gray-700">
          {selected}
        </span>
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

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedSort: string
  onSortChange: (sort: string) => void
  categories: string[]
  sortOptions: { [key: string]: string }
}

const SearchFilter = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  categories,
  sortOptions,
}: SearchFilterProps) => {
  return (
    <div className="mb-8">
      {/* Grid 3분할 레이아웃 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* 검색바 */}
        <div className="lg:col-span-1">
          <div className="relative">
            <input
              type="text"
              placeholder="강의를 검색해보세요..."
              className="focus:ring-primary-500 focus:border-primary-500 h-[38px] w-full rounded-lg border border-gray-300 pr-10 pl-4 text-sm focus:ring-2 focus:outline-none"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
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

        {/* 카테고리 드롭다운 */}
        <div className="lg:col-span-1">
          <SimpleDropDown
            options={categories}
            selected={selectedCategory}
            onSelect={onCategoryChange}
            leftIcon={FolderIcon}
          />
        </div>

        {/* 정렬 드롭다운 */}
        <div className="lg:col-span-1">
          <SimpleDropDown
            options={Object.values(sortOptions)}
            selected={sortOptions[selectedSort] || '인기순'}
            onSelect={(label) => {
              const sortValue =
                Object.keys(sortOptions).find(
                  (key) => sortOptions[key] === label
                ) || 'popularity'
              onSortChange(sortValue)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchFilter
