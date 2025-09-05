import { SearchInput } from './SearchInput'
import { CategoryFilter } from './CategoryFilter'
import { SortFilter } from './SortFilter'
import { FilterResetButton } from './FilterResetButton'
import { ARIA_LABELS } from '@src/constants/ui'

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedSort: string
  onSortChange: (sort: string) => void
  categories: string[]
  sortOptions: Record<string, string>
  appliedFiltersCount?: number
  onResetFilters?: () => void
}

function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  categories,
  sortOptions,
  appliedFiltersCount = 0,
  onResetFilters,
}: SearchFilterProps) {
  return (
    <section className="mb-8" aria-label={ARIA_LABELS.SEARCH_FILTER}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <SearchInput
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          className="lg:col-span-1"
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          categories={categories}
          className="lg:col-span-1"
        />

        <SortFilter
          selectedSort={selectedSort}
          onSortChange={onSortChange}
          sortOptions={sortOptions}
          className="lg:col-span-1"
        />

        {/* 필터 리셋 버튼 */}
        <div className="lg:col-span-1">
          {onResetFilters && (
            <FilterResetButton
              onReset={onResetFilters}
              appliedFiltersCount={appliedFiltersCount}
              className="h-full"
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default SearchFilter
