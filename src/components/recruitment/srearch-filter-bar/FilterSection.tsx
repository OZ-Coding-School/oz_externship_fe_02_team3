import DropDown from '@src/components/commons/dropdown/DropDown'

interface FilterSectionProps {
  selectedTag: string
  selectedSort: string
  onTagChange: (value: string) => void
  onSortChange: (value: string) => void
}

export default function FilterSection({
  selectedTag,
  selectedSort,
  onTagChange,
  onSortChange,
}: FilterSectionProps) {
  // API 연결 전 임시 옵션 목록
  const tagOptions = ['전체 태그', '프론트엔드', '백엔드']
  const sortingOptions = ['최신순', '오래된순', '인기순']

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="pb-2 text-gray-700">태그</p>
        <DropDown
          selected={selectedTag}
          options={tagOptions}
          onSelect={onTagChange}
          placeholder="태그 선택"
          className="w-full"
        />
      </div>
      <div>
        <p className="pb-2 text-gray-700">정렬</p>
        <DropDown
          selected={selectedSort}
          options={sortingOptions}
          onSelect={onSortChange}
          placeholder="정렬 선택"
          className="w-full"
        />
      </div>
    </div>
  )
}
