import { useState, useCallback, useEffect } from 'react'
import type { Tag } from '@src/types/tag'

export function useSelectedTags(initial: Tag[] = [], max = 5) {
  const [selected, setSelected] = useState<Tag[]>(initial)

  // initial 값이 바뀌면 동기화 (모달 열릴 때 부모가 넘겨준 최신 선택 반영)
  useEffect(() => {
    setSelected(initial)
  }, [initial])

  const isSelected = useCallback(
    (id: number) => selected.some((t) => t.id === id),
    [selected]
  )

  const toggle = useCallback(
    (tag: Tag, nextChecked: boolean) => {
      setSelected((prev) => {
        if (nextChecked) {
          if (prev.some((t) => t.id === tag.id)) return prev
          if (prev.length >= max) return prev // 최신 prev 길이로 판단
          return [...prev, tag]
        }
        return prev.filter((t) => t.id !== tag.id)
      })
    },
    [max]
  )

  const removeById = useCallback((id: number) => {
    setSelected((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const clear = useCallback(() => setSelected([]), [])
  const setMany = useCallback((tags: Tag[]) => setSelected(tags), [])

  return {
    selected,
    setSelected,
    isSelected,
    toggle,
    removeById,
    clear,
    setMany,
    atMax: selected.length >= max,
  }
}
