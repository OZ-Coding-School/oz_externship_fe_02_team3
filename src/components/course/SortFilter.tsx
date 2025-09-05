import { ChevronDown } from 'lucide-react'
import SelectableDropDown from './SelectableDropDown'
import { cn } from '@src/utils/cn'

interface SortFilterProps {
  selectedSort: string
  onSortChange: (sort: string) => void
  sortOptions: Record<string, string>
  className?: string
}

export function SortFilter({
  selectedSort,
  onSortChange,
  sortOptions,
  className,
}: SortFilterProps) {
  const handleSortSelection = (selectedLabel: string) => {
    const sortKey =
      Object.keys(sortOptions).find(
        (key) => sortOptions[key] === selectedLabel
      ) || 'popularity'
    onSortChange(sortKey)
  }

  return (
    <div className={cn('relative', className)}>
      <SelectableDropDown
        selected={sortOptions[selectedSort] || '인기순'}
        options={Object.values(sortOptions)}
        onSelect={handleSortSelection}
        rightIcon={ChevronDown}
        placeholder="정렬 선택"
        className="cursor-pointer"
      />
    </div>
  )
}
