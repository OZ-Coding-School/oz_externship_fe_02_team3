import { Search } from 'lucide-react'
import { cn } from '@src/utils/cn'

interface SearchInputProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchInput({
  searchQuery,
  onSearchChange,
  placeholder = '강의를 검색해보세요...',
  className,
}: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <input
        type="text"
        placeholder={placeholder}
        className="focus:border-primary-500 focus:ring-primary-500 h-[38px] w-full cursor-text rounded-lg border border-gray-300 pr-10 pl-4 text-sm transition-colors focus:ring-2 focus:outline-none"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
}
