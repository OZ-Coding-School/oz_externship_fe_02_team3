import { Search as SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebounce } from '@hooks/useDebounce'
import { cn } from '@src/utils/cn'

interface SearchBarProps {
  value?: string // 초기값
  onSearch: (keyword: string) => void // 디바운스 후 검색 실행
  placeholder?: string
  delay?: number // 디바운스 시간 (ms)
  className?: string
}

export function SearchBar({
  value = '',
  onSearch,
  placeholder = '검색어 입력',
  delay = 500,
  className,
}: SearchBarProps) {
  const [keyword, setKeyword] = useState(value)
  const debouncedKeyword = useDebounce(keyword, delay)

  // 디바운스된 키워드가 변경되면 검색 실행
  useEffect(() => {
    onSearch(debouncedKeyword)
  }, [debouncedKeyword, onSearch])

  return (
    <div
      className={cn(
        'mb-6 flex w-112 items-center gap-2 rounded-lg border border-gray-200 p-3',
        className
      )}
    >
      <SearchIcon className="h-4 text-gray-400" />
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="focus:border-transparent focus:outline-none"
      />
    </div>
  )
}
