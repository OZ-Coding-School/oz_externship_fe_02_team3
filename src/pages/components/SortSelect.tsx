import type { CoursesQuery } from '@type/course'

interface Props {
  value: NonNullable<CoursesQuery['sort']>
  onChange: (v: NonNullable<CoursesQuery['sort']>) => void
}

function SortSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Props['value'])}
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
    >
      <option value="popular">인기순</option>
      <option value="latest">최신순</option>
      <option value="rating">평점순</option>
      <option value="priceAsc">가격 낮은순</option>
      <option value="priceDesc">가격 높은순</option>
    </select>
  )
}
export default SortSelect
