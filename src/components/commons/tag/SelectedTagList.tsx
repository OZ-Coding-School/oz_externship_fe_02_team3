import { cn } from '@src/utils/cn'
import SelectedTag from './SelectedTag'
import { useMemo } from 'react'

export interface TagOption {
  id: string
  label: string
  colorClass?: string
}

interface SelectedTagListProps {
  selectedIds: string[] // 선택된 태그 id 목록
  options: TagOption[] // id label 매핑
  onRemove?: (id: string) => void // 선택된 태그 퓌소
  className?: string
}

export default function SelectedTagList({
  selectedIds,
  options,
  onRemove,
  className,
}: SelectedTagListProps) {
  const optionMap = useMemo(
    //options 배열이 바뀔 때만 다시 계산
    () => new Map(options.map((opt) => [opt.id, opt.label])),
    [options]
  )

  const selected = selectedIds
    .map((id) => ({ id, label: optionMap.get(id) }))
    .filter(
      (tag): tag is { id: string; label: string } => tag.label !== undefined
    )
  // selected에는 항상 [{id, label}] 배열 형태

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {selected.map(({ id, label }) => (
        <SelectedTag
          key={id}
          label={label}
          onRemove={onRemove ? () => onRemove(id) : undefined}
        />
      ))}
    </div>
  )
}
