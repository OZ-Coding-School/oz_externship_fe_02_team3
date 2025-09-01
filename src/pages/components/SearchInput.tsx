import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

interface Props {
  value: string
  onChange: (v: string) => void
}

function SearchInput({ value, onChange }: Props) {
  const [text, setText] = useState(value)
  useEffect(() => setText(value), [value])

  // 간단 디바운스
  useEffect(() => {
    const t = setTimeout(() => onChange(text.trim()), 300)
    return () => clearTimeout(t)
  }, [text, onChange])

  return (
    <div className="relative">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="강의명, 강사명으로 검색"
        className="focus:border-primary-400 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none"
      />
      <Search className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 stroke-gray-500" />
    </div>
  )
}
export default SearchInput
