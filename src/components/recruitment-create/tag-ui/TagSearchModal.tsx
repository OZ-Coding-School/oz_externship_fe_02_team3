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

const isNumber = (v: unknown): v is number => typeof v === 'number'

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
    register,
  } = useTagManager(open, size)

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
      await register(name)
    },
    [register]
  )

  useEffect(() => {
    if (!open) return
    setSelected(initialSelected)
    setPage(1)
  }, [open, initialSelected, setPage, setSelected])

  const handleClose = () => {
    setQuery('')
    onClose()
  }

  const toggleByClick = useCallback(
    (tag: Tag) => {
      if (!isNumber(tag.id)) return

      const nextChecked = !isSelected(tag.id)
      if (atMax && nextChecked) return

      toggle(tag, nextChecked)
    },
    [isSelected, toggle, atMax]
  )

  return (
    <Modal open={open} onClose={onClose} size="md" closeOnOutsideClick={false}>
      <Modal.Header onClose={handleClose}>
        <h2 className="truncate text-xl font-semibold text-gray-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          공고에 추가할 태그를 선택하세요. (최대 {max}개)
        </p>
      </Modal.Header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="relative w-full px-6 py-3">
          <SearchBar
            value={query}
            onSearch={handleSearch}
            placeholder="태그명으로 검색..."
            className="m-0 w-full"
            delay={300}
          />
        </div>

        <SelectedTagSection
          selected={selected}
          max={max}
          items={items}
          onRemove={(id) => {
            if (isNumber(id)) removeById(id)
          }}
        />

        <TagResultSection
          items={items}
          loading={loading}
          query={query}
          creating={creating}
          justCreatedId={justCreatedId}
          isSelected={isSelected}
          toggle={toggleByClick}
          atMax={atMax}
          onCreate={handleCreate}
        />

        <div className="relative z-0 px-6 pt-2 pb-6">
          <Pagination
            page={page}
            totalCount={count}
            size={size}
            onPageChange={setPage}
            className="w-full justify-center"
          />
        </div>
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
