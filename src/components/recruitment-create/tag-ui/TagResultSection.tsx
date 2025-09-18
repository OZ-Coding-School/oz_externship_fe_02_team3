import LoadingSpinner from '@src/components/commons/LoadingSpinner'
import type { Tag } from '@src/types/tag'
import TagCreateBox from './TagCreateBox'
import TagCheckbox from '@src/components/commons/tag/TagCheckbox'
import { cn } from '@src/utils/cn'

interface TagResultSectionProps {
  items: Tag[]
  loading: boolean
  query: string
  creating: boolean
  justCreatedId: number | null
  isSelected: (id: number) => boolean
  toggle: (tag: Tag, nextChecked: boolean) => void
  atMax: boolean
  onCreate: (name: string) => void
}

export default function TagResultSection({
  items,
  loading,
  query,
  creating,
  justCreatedId,
  isSelected,
  toggle,
  atMax,
  onCreate,
}: TagResultSectionProps) {
  return (
    <div className="flex h-[290px] w-full flex-col items-start gap-2 px-6">
      {loading ? (
        <div className="flex h-[290px] w-full items-center justify-center">
          <LoadingSpinner message="태그 검색 중..." className="bg-white" />
        </div>
      ) : items.length === 0 ? (
        <TagCreateBox value={query} onCreate={onCreate} loading={creating} />
      ) : (
        items.map((tag) => (
          <TagCheckbox
            key={tag.id}
            label={tag.name}
            checked={isSelected(tag.id)}
            onChange={(checked) => toggle(tag, checked)}
            className={cn(
              !isSelected(tag.id) && atMax
                ? 'cursor-not-allowed opacity-50'
                : '',
              tag.id === justCreatedId
                ? 'ring-success-500 bg-success-100 animate-pulse ring-2'
                : ''
            )}
          />
        ))
      )}
    </div>
  )
}
