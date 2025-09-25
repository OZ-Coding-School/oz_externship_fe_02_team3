import { SearchBar } from '../../commons/SearchBar'
import FilterSection from './FilterSection'
import { useFilterStore } from '@src/store/useJobFilterStore'

export default function SearchFilterBar() {
  const {
    selectedTag,
    selectedSort,
    setSearchTerm,
    setSelectedTag,
    setSelectedSort,
  } = useFilterStore()

  return (
    <div className="mx-auto w-full max-w-[1216px] rounded-lg border border-gray-200 bg-white p-6">
      <SearchBar
        onSearch={setSearchTerm}
        placeholder="공고 제목으로 검색..."
        delay={300}
      />
      <FilterSection
        selectedTag={selectedTag}
        selectedSort={selectedSort}
        onTagChange={setSelectedTag}
        onSortChange={setSelectedSort}
      />
    </div>
  )
}
