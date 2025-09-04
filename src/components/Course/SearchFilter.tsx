import { ChevronDown, FolderIcon } from 'lucide-react'
import SelectableDropDown from '../SelectableDropDown'

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
          <SelectableDropDown
            selected={selectedCategory}
            options={categories}
            onSelect={onCategoryChange}
            leftIcon={FolderIcon}
            rightIcon={ChevronDown}
            placeholder="카테고리 선택"
          />
        </div>

        {/* 정렬 드롭다운 */}
        <div className="lg:col-span-1">
          <SelectableDropDown
            selected={sortOptions[selectedSort] || '인기순'}
            options={Object.values(sortOptions)}
            onSelect={(label) => {
              const sortValue =
                Object.keys(sortOptions).find(
                  (key) => sortOptions[key] === label
                ) || 'popularity'
              onSortChange(sortValue)
            }}
            rightIcon={ChevronDown}
            placeholder="정렬 선택"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchFilter
