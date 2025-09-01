interface Props {
  categories: string[]
  active: string
  onSelect: (cat: string) => void
}

function CategoryChips({ categories, active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => {
        const act = c === active || (c === '전체' && !active)
        return (
          <button
            key={c}
            type="button"
            onClick={() => onSelect(c === '전체' ? '' : c)}
            className={`rounded-full px-3 py-1 text-sm ${act ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {c}
          </button>
        )
      })}
    </div>
  )
}
export default CategoryChips
