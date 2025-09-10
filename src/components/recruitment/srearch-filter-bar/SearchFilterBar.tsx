import { SearchBar } from '../../commons/SearchBar'
import FilterSection from './FilterSection'

export default function SearchFilterBar() {
  const handleSearch = (keyword: string) => {
    void keyword
    // TODO: 실제 검색 로직 구현
  }

  return (
    <div className="w-[1216px] rounded-lg border border-gray-200 bg-white p-6">
      <SearchBar
        onSearch={handleSearch}
        placeholder="공고 제목으로 검색..."
        delay={300}
      />
      <FilterSection />
    </div>
  )
}
