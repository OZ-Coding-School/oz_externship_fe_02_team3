import Button from '@src/components/commons/button/Button'
import { EmptyState } from '@src/components/commons/EmptyState'
import { cn } from '@src/utils/cn'
import type { Tag } from '@src/types/tag'
import { useMemo } from 'react'

interface Props {
  items: Tag[]
  loading: boolean
  query: string
  creating: boolean
  justCreatedId?: number | null
  isSelected: (id: number) => boolean
  toggle: (tag: Tag) => void
  atMax: boolean
  onCreate: (name: string) => Promise<void>
}

export default function TagResultSection({
  items,
  loading,
  query,
  creating,
  justCreatedId = null,
  isSelected,
  toggle,
  atMax,
  onCreate,
}: Props) {
  const q = (query ?? '').trim()

  const showCreate = useMemo(
    () => !loading && q.length > 0 && items.length === 0,
    [loading, q, items.length]
  )

  return (
    <section className="px-6 py-3">
      {atMax && (
        <div className="mb-3 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-[13px] text-yellow-900">
          최대 선택 개수에 도달했습니다. 기존 태그를 제거하면 더 선택할 수
          있어요.
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-10 text-sm text-gray-500">
          불러오는 중…
        </div>
      )}

      {!loading && items.length > 0 && (
        <ul className="space-y-2" aria-label="검색 결과 태그">
          {items.map((t) => {
            const selected = isSelected(t.id)
            const disabled = atMax && !selected

            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (disabled) return
                    toggle(t)
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition',
                    selected
                      ? 'border-primary-300 bg-primary-50 text-primary-800'
                      : 'border-gray-200 bg-white hover:bg-gray-50',
                    disabled && 'cursor-not-allowed opacity-60'
                  )}
                  aria-pressed={selected}
                  aria-disabled={disabled}
                >
                  <span className="truncate text-sm">{t.name}</span>
                  <input
                    className="h-5 w-5"
                    type="checkbox"
                    checked={selected}
                    readOnly
                  />
                </button>

                {justCreatedId === t.id && (
                  <div className="mt-1 text-[11px] text-yellow-800">
                    방금 등록된 태그
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}

      {!loading && items.length === 0 && (
        <div className="mt-6">
          <EmptyState
            title="검색 결과가 없습니다."
            description="다른 키워드로 검색하거나, 새 태그를 등록해 보세요."
            iconType="TAG"
            size="sm"
          />
        </div>
      )}

      {showCreate && (
        <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4">
          <p className="mb-2 text-[13px] text-yellow-900">
            “{q}” 태그를 새로 만드시겠습니까?
          </p>
          <Button
            size="base"
            buttonInnerText={creating ? '등록 중…' : '새로 등록하기'}
            onClick={() => onCreate(q)}
            disabled={creating}
          />
        </div>
      )}
    </section>
  )
}
