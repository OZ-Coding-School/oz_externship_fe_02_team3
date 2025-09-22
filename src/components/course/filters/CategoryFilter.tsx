import { ChevronDown } from 'lucide-react'
import SelectableDropDown from '../ui/SelectableDropDown'
import { FILTER_SORT } from '@src/constants/ui'
import { cn } from '@src/utils/cn'

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  categories: string[]
  className?: string
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  categories,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn('relative', className)}>
      <SelectableDropDown
        selected={selectedCategory}
        options={categories}
        onSelect={onCategoryChange}
        rightIcon={ChevronDown}
        placeholder={FILTER_SORT.DEFAULT_CATEGORY}
        className="cursor-pointer"
      />
    </div>
  )
}
