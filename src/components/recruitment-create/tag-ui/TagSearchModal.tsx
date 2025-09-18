import Button from '@src/components/commons/button/Button'
import Modal from '@src/components/commons/modal'
import { useCallback, useEffect } from 'react'
import { SearchBar } from '@src/components/commons/SearchBar'
import Pagination from '@src/components/commons/pagination/Pagination'
import type { Tag } from '@src/types/tag'
import { useTagManager } from '@src/hooks/tag/useTagManager'
import { useSelectedTags } from '@src/hooks/tag/useSelectedTags'
import SelectedTagSection from './SelectedTagSection'
import TagResultSection from './TagResultSection'

interface TagSearchModalProps {
  open: boolean
  onClose: () => void
  onSubmit?: (next: Tag[]) => void
  title?: string
  initialSelected?: Tag[]
  max?: number
  size?: number
}

export default function TagSearchModal({
  open,
  onClose,
  onSubmit,
  title = '태그 선택',
  initialSelected = [],
  max = 5,
  size = 5,
}: TagSearchModalProps) {
  const {
    query,
    setQuery,
    page,
    setPage,
    items,
    count,
    loading,
    creating,
    justCreatedId,
    register, // 새 태그 등록
  } = useTagManager(open, size) // 검색/페이지네이션/등록

  // 선택 상태 관리
  const { selected, setSelected, atMax, isSelected, toggle, removeById } =
    useSelectedTags(initialSelected, max)

  const handleConfirm = () => {
    onSubmit?.(selected)
    setQuery('')
    onClose()
  }

  const handleSearch = useCallback(
    (keyword: string) => {
      setQuery((prev) => (prev === keyword ? prev : keyword))
      setPage(1)
    },
    [setQuery, setPage]
  )

  const handleCreate = useCallback(
    async (name: string) => {
      await register(name) // 반환된 Tag는 쓰지 않음 => Promise<void>로 취급
    },
    [register]
  )

  useEffect(() => {
    if (!open) return
    setSelected(initialSelected)
    setPage(1)
  }, [open, initialSelected, setPage])

  const handleClose = () => {
    setQuery('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} size="md" closeOnOutsideClick={false}>
      <Modal.Header onClose={handleClose}>
        <h2 className="truncate text-xl font-semibold text-gray-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          공고에 추가할 태그를 선택하세요. (최대 5개)
        </p>
      </Modal.Header>
      <div className="min-h-0 flex-1 gap-3 overflow-y-auto">
        <div className="relative w-full px-6 py-3">
          <SearchBar
            value={query}
            onSearch={handleSearch}
            placeholder="태그명으로 검색..."
            className="m-0 w-full"
            delay={300}
          />
        </div>
        {/* 섵택된 태그 리스트 */}
        <SelectedTagSection
          selected={selected}
          max={max}
          items={items}
          onRemove={(id) => removeById(Number(id))}
        />
        {/* 결과 체크박스 리스트 */}
        <TagResultSection
          items={items}
          loading={loading}
          query={query}
          creating={creating}
          justCreatedId={justCreatedId}
          isSelected={isSelected}
          toggle={toggle}
          atMax={atMax}
          onCreate={handleCreate}
        />
        {/* 페이지네이션 */}
        <Pagination
          page={page}
          totalCount={count}
          size={size}
          onPageChange={setPage}
          className=""
        />
      </div>
      <Modal.Footer>
        <div className="ml-auto flex gap-2">
          <Button
            buttonInnerText="취소"
            variant="outline"
            onClick={handleClose}
          />
          <Button
            buttonInnerText="선택완료"
            variant="primary"
            size="base"
            fontWeight="medium"
            iconClassName="rotate-[90deg]"
            onClick={handleConfirm}
            iconSize="sm"
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}
