import DropDown from '@src/components/commons/dropdown/DropDown'
import { ChevronDown as ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

export default function FilterSection() {
  // API 연결 전 임시 옵션 목록
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedTag, setSelectedTag] = useState('전체 태그')
  const [selectedSort, setSelectedSort] = useState('최신순')
  const categoryOptions = ['전체', '프론트엔드', '백엔드', '클라우드']
  const tagOptions = ['전체 태그', '초보자환영', '주말스터디', '프로젝트 중심']
  const sortingOptions = ['최신순', '오래된순', '인기순']

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="pb-2 text-gray-700">카테고리</p>
        <DropDown
          selected={selectedCategory}
          options={categoryOptions}
          onSelect={setSelectedCategory}
          rightIcon={ChevronDownIcon}
          placeholder="카테고리 선택"
          className="w-full"
        />
      </div>
      <div>
        <p className="pb-2 text-gray-700">태그</p>
        <DropDown
          selected={selectedTag}
          options={tagOptions}
          onSelect={setSelectedTag}
          rightIcon={ChevronDownIcon}
          placeholder="카테고리 선택"
          className="w-full"
        />
      </div>
      <div>
        <p className="pb-2 text-gray-700">정렬</p>
        <DropDown
          selected={selectedSort}
          options={sortingOptions}
          onSelect={setSelectedSort}
          rightIcon={ChevronDownIcon}
          placeholder="카테고리 선택"
          className="w-full"
        />
      </div>
    </div>
  )
}
