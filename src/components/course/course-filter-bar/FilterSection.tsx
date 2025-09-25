import { useCourses } from '@src/hooks/course/useCourse'
import { CATEGORY_LIST, SORT_LABELS } from '@src/constants/courses'
import { useCourseFilters } from '@src/hooks/course/useCourseFilters'
import DropDown from '@src/components/commons/dropdown/DropDown'
import {
  Folder as FolderIcon,
  ArrowDownWideNarrow as SortIcon,
} from 'lucide-react'
export default function FilterSection() {
  const { courses } = useCourses()
  const { selectedCategory, setSelectedCategory, sortBy, setSortBy } =
    useCourseFilters(courses)
  const sortLabels = Object.values(SORT_LABELS)

  // 더 안전한 라벨 가져오기
  const getSortLabel = (key: string): string => {
    return key in SORT_LABELS
      ? SORT_LABELS[key as keyof typeof SORT_LABELS]
      : '인기순'
  }

  const selectedSortLabel = getSortLabel(sortBy)
  const handleSortSelection = (selectedLabel: string) => {
    const sortKey =
      Object.entries(SORT_LABELS).find(
        ([_key, value]) => value === selectedLabel
      )?.[0] || 'popularity'
    setSortBy(sortKey) // 올바른 키값 전달
  }
  return (
    <>
      <DropDown
        selected={selectedCategory}
        options={CATEGORY_LIST}
        onSelect={setSelectedCategory}
        placeholder="전체 카테고리"
        className="w-full cursor-pointer bg-white"
        leftIcon={FolderIcon}
      />

      <DropDown
        selected={selectedSortLabel}
        options={sortLabels}
        onSelect={handleSortSelection}
        leftIcon={SortIcon}
        placeholder="정렬 선택"
        className="w-full cursor-pointer bg-white"
      />
    </>
  )
}
