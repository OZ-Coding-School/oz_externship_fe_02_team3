import { useEffect, useState, useCallback } from 'react'
import type { Tag } from '@src/types/tag'
import { createTag, fetchTags } from '@src/api/tag'
import { useToast } from '@src/components/commons/toast'
import axios from 'axios'
import { checkTagValidity } from '@src/validations/tag'

export function useTagManager(open: boolean, pageSize = 5) {
  const toast = useToast()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Tag[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [justCreatedId, setJustCreatedId] = useState<number | null>(null)

  const fetchAndSetTags = useCallback(async () => {
    if (!open) return
    setLoading(true)
    try {
      const { results, count } = await fetchTags({
        search: query,
        page,
        size: pageSize,
      })
      setItems(Array.isArray(results) ? results : [])
      setCount(typeof count === 'number' ? count : 0)
    } catch {
      setItems([])
      setCount(0)
      toast.error({
        title: '태그 불러오기 실패',
        content: '잠시 후 다시 시도해 주세요.',
      })
    } finally {
      setLoading(false)
    }
  }, [open, query, page, pageSize, toast])

  useEffect(() => {
    fetchAndSetTags()
  }, [fetchAndSetTags])

  const register = useCallback(
    async (name: string) => {
      const trimmed = name.trim()
      const msg = checkTagValidity(trimmed)
      if (msg) {
        toast.warning({ title: '태그 등록 실패', content: msg })
        throw new Error('validation_failed')
      }
      setCreating(true)
      try {
        const tag = await createTag(trimmed)

        const id = typeof tag.id === 'number' ? tag.id : null
        setJustCreatedId(id)

        setQuery(tag.name)
        await fetchAndSetTags()

        toast.success({
          title: '태그 등록 완료',
          content: `${tag.name} 태그가 등록되었습니다. 목록에서 선택해 주세요.`,
        })
        return tag
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.status === 409) {
            toast.warning({
              title: '태그 등록 실패',
              content: `이미 존재하는 태그예요. 목록에서 선택해 주세요.`,
            })
          } else {
            toast.error({
              title: '태그 등록 실패',
              content: '잠시 후 다시 시도해 주세요.',
            })
          }
        } else {
          toast.error({
            title: '태그 등록 실패',
            content: '잠시 후 다시 시도해 주세요.',
          })
        }
      } finally {
        setCreating(false)
        setTimeout(() => setJustCreatedId(null), 2000)
      }
    },
    [fetchAndSetTags, toast]
  )

  return {
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
  }
}
