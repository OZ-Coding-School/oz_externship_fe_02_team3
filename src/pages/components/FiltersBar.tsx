import type { CoursesQuery } from '@type/course'
import SearchInput from './SearchInput'
import CategoryChips from './CategoryChips'
import SortSelect from './SortSelect'

interface Props {
  value: CoursesQuery
  onChange: (next: Partial<CoursesQuery>) => void
}

function FiltersBar({ value, onChange }: Props) {
  return (
    <section className="mb-6 space-y-3">
      <SearchInput
        value={value.q ?? ''}
        onChange={(q) => onChange({ q, page: 1 })}
      />
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <CategoryChips
          active={value.category ?? ''}
          onSelect={(category) => onChange({ category, page: 1 })}
          categories={['전체', '클라우드', 'React', 'Vue', 'Data Science']}
        />
        <SortSelect
          value={value.sort ?? 'popular'}
          onChange={(sort) => onChange({ sort, page: 1 })}
        />
      </div>
    </section>
  )
}
export default FiltersBar
