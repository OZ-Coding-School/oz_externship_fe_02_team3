import SelectedTagList from '@src/components/commons/tag/SelectedTagList'
import type { Tag } from '@src/types/tag'
import { useMemo } from 'react'

interface SelectedTagSectionProps {
  selected: Tag[]
  max: number
  items: Tag[]
  onRemove: (id: number) => void
}

export default function SelectedTagSection({
  selected,
  max,
  items,
  onRemove,
}: SelectedTagSectionProps) {
  const selectedIds = useMemo(() => selected.map((t) => t.id), [selected])
  const options = useMemo(
    () =>
      [...selected, ...(items ?? [])].map((t) => ({
        id: t.id,
        label: t.name,
      })),
    [selected, items]
  )
  return (
    <div className="px-6 py-3">
      <p className="mb-3 text-sm">
        선택된 태그 ({selected.length}/{max})
      </p>
      {selectedIds.length > 0 ? (
        <SelectedTagList
          selectedIds={selectedIds}
          options={options}
          onRemove={onRemove}
        />
      ) : (
        <p className="text-xs font-light text-gray-400">
          선택된 태그가 없습니다
        </p>
      )}
    </div>
  )
}
