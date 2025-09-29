import Button from '@src/components/commons/button/Button'
import { EmptyState } from '@src/components/commons/EmptyState'
import SelectedTagList from '@src/components/commons/tag/SelectedTagList'
import type { Tag } from '@src/types/tag'
import { cn } from '@src/utils/cn'
import { Plus } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

export interface TagBoxProps {
  value?: Tag[]
  onChange?: React.Dispatch<React.SetStateAction<Tag[]>>
  max?: number
  title?: string
  onOpenSearch?: () => void
}

type TagWithIdName = Tag & { id: number; name: string }

function hasIdName(t: Tag): t is TagWithIdName {
  return (
    typeof (t as Tag).id === 'number' && typeof (t as Tag).name === 'string'
  )
}

export default function TagBox({
  value,
  onChange,
  max = 5,
  title = '사용자 정의 태그',
  onOpenSearch,
}: TagBoxProps) {
  const [inner, setInner] = useState<Tag[]>([])
  const tags = value ?? inner
  const setTags = onChange ?? setInner

  const removeById = useCallback(
    (id: number) => {
      const targetId = Number(id)
      setTags((prev) =>
        prev.filter((tag) =>
          typeof tag.id === 'number' ? tag.id !== targetId : true
        )
      )
    },
    [setTags]
  )

  const selectedIds = useMemo(
    () =>
      tags
        .map((t) => t.id)
        .filter((id): id is number => typeof id === 'number'),
    [tags]
  )

  const options = useMemo(
    () => tags.filter(hasIdName).map((t) => ({ id: t.id, label: t.name })),
    [tags]
  )

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-gray-900">{title}</span>
        <Button
          size="base"
          buttonInnerText="태그 검색"
          icon={Plus}
          iconSize="sm"
          onClick={onOpenSearch}
        />
      </div>

      <div
        className={cn(
          'rounded-xl border-2 px-4 py-6',
          tags.length === 0
            ? 'border-dashed border-gray-300'
            : 'border-gray-300 bg-gray-100'
        )}
      >
        <div
          className={cn(
            'flex flex-wrap items-center gap-3',
            tags.length === 0 ? 'justify-center' : 'justify-start'
          )}
        >
          {tags.length === 0 ? (
            <EmptyState
              title="선택된 태그가 없습니다."
              iconType="TAG"
              titleClassName="text-gray-500 pb-0 text-sm"
              description="태그 검색 버튼을 클릭해서 태그를 추가해 보세요"
              descClassName="text-xs"
              iconSize="lg"
              size="sm"
            />
          ) : (
            <SelectedTagList
              selectedIds={selectedIds}
              options={options}
              onRemove={removeById}
            />
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500">
        태그는 최대 {max}개까지 선택할 수 있습니다 ({tags.length}/{max})
      </p>
    </div>
  )
}
