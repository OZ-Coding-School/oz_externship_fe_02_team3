import { SearchInput } from './SearchInput'
import { CategoryFilter } from './CategoryFilter'
import { SortFilter } from './SortFilter'

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedSort: string
  onSortChange: (sort: string) => void
  categories: string[]
  sortOptions: Record<string, string>
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
    <section className="mb-8" aria-label="검색 및 필터">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
      </div>
    </section>
  )
}

export default SearchFilter
