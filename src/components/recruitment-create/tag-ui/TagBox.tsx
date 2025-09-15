import Button from '@src/components/commons/button/Button'
import { EmptyState } from '@src/components/commons/EmptyState'
import SelectedTagList from '@src/components/commons/tag/SelectedTagList'
import { cn } from '@src/utils/cn'
import { Plus } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

export interface Tag {
  id: number
  name: string
}

export interface TagBoxProps {
  value?: Tag[] // 선택된 태그 목록
  onChange?: (next: Tag[]) => void // 변경 콜백
  max?: number // 최대 선택 가능 개수 기본 5
  title?: string // 기본 '사용자 정의 태그'
  onOpenSearch?: () => void // 모달 연결
}

export default function TagBox({
  value,
  onChange,
  max = 5,
  title = '사용자 정의 태그',
  onOpenSearch,
}: TagBoxProps) {
  const [inner, setInner] = useState<Tag[]>([
    // 더미데이터
    { id: 1, name: '초보자환영' },
    { id: 2, name: '주말스터디' },
    { id: 3, name: '프로젝트중심' },
  ])

  const tags = value ?? inner //현재 TagBox가 관리할 실제 태그 목록
  const setTags = onChange ?? setInner //태그 목록을 변경
  const countText = useMemo(() => `(${tags.length}/${max})`, [tags.length, max]) // 현재 태그 개수와 최대 개수를 문자열로 표시
  const selectedIds = useMemo(() => tags.map((t) => String(t.id)), [tags]) // 현재 선택된 태그들의 id 목록

  const options = useMemo(
    () => tags.map((tag) => ({ id: String(tag.id), label: tag.name })),
    [tags]
  )

  // 태그 삭제 처리
  const removeById = useCallback(
    (idStr: string) => {
      const idNum = Number(idStr)
      setTags(tags.filter((tag) => tag.id !== idNum))
    },
    [tags, setTags]
  )

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <span className="text-md font-medium text-gray-900">{title}</span>
        <Button
          size="base"
          buttonInnerText="태그 검색"
          icon={Plus}
          iconSize="sm"
          onClick={onOpenSearch} //모달연결
        ></Button>
      </div>
      <div
        className={cn(
          'rounded-sm border-2 px-4 py-6',
          tags.length === 0
            ? 'border-dashed border-gray-300'
            : 'border border-gray-300 bg-gray-100'
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
              titleClassName="text-gray-500 pb-0"
              description="태그 검색 버튼을 클릭해서 태그를 추가해 보세요"
              descClassName="text-md"
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
        태그는 최대 {max}개까지 선택할 수 있습니다 {countText}
      </p>
    </div>
  )
}
