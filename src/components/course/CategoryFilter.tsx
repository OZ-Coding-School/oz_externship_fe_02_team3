import { ChevronDown, FolderIcon } from 'lucide-react'
import SelectableDropDown from './SelectableDropDown'
import { cn } from '@src/utils/cn'

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  categories: string[]
  className?: string
}

export const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  categories,
  className,
}: CategoryFilterProps) => {
  return (
    <div className={cn('relative', className)}>
      <SelectableDropDown
        selected={selectedCategory}
        options={categories}
        onSelect={onCategoryChange}
        leftIcon={FolderIcon}
        rightIcon={ChevronDown}
        placeholder="카테고리 선택"
        className="cursor-pointer"
      />
    </div>
  )
}
