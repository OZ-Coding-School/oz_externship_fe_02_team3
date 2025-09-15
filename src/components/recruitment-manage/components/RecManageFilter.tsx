import DropDown from '@src/components/commons/dropdown/DropDown'
import { useState } from 'react'

const statusOptions = [
  { id: 1, name: '전체 (4)' },
  { id: 2, name: '모집중 (2)' },
  { id: 3, name: '마감됨 (1)' },
]

const sortOptions = [
  { id: 1, name: '최신순' },
  { id: 2, name: '조회수 높은 순' },
  { id: 3, name: '북마크 많은 순' },
]

export default function RecManageFilter() {
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [selectedSort, setSelectedSort] = useState<string>('')

  return (
    <div className="w-full max-w-[1216px] rounded-xl bg-white p-6 ring-1 ring-gray-200">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-gray-700">상태</p>
          <DropDown
            selected={selectedStatus}
            options={statusOptions}
            onSelect={setSelectedStatus}
            placeholder="전체 (4)"
          />
        </div>

        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-gray-700">정렬</p>
          <DropDown
            selected={selectedSort}
            options={sortOptions}
            onSelect={setSelectedSort}
            placeholder="최신순"
          />
        </div>
      </div>
    </div>
  )
}
