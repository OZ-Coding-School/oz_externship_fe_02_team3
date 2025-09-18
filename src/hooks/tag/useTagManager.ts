import { useEffect, useState, useCallback } from 'react'
import type { Tag } from '@src/types/tag'
import { createTag, fetchTags } from '@src/api/tag'
import { useToast } from '@src/components/commons/toast'
import axios from 'axios'
import { checkTagValidity } from '@src/validations/tag'

export function useTagManager(open: boolean, pageSize = 5) {
  const toast = useToast()
  const [query, setQuery] = useState('') // 검색어
  const [page, setPage] = useState(1) // 현재 페이지
  const [items, setItems] = useState<Tag[]>([]) // 검색 결과
  const [count, setCount] = useState(0) // 총 개수
  const [loading, setLoading] = useState(false) // 로딩중인지
  const [creating, setCreating] = useState(false) // 새 태그 등록중인지
  const [justCreatedId, setJustCreatedId] = useState<number | null>(null) //새등록 태그 ID 임시 저장 => 등록된 상태 에니메이션을 위함

  const fetchAndSetTags = useCallback(async () => {
    if (!open) return
    setLoading(true)
    try {
      const { results, count } = await fetchTags({
        search: query, // 검색어
        page, // 현재 페이지 번호
        size: pageSize, // 페이지당 항목 개수
      })
      setItems(Array.isArray(results) ? results : []) // 받아온 태그 리스트를 상태에 저장
      setCount(typeof count === 'number' ? count : 0) // 전체 태그 개수를 상태에 저장 (페이지네이션용)
    } catch (error) {
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

  // open, query, page 변경 시 실행
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
        const tag = await createTag(name.trim()) // 새 태그 생성 POST 200 OK { id, name } 반환
        setJustCreatedId(tag.id) // 새 등록된 태그 ID 임시 저장
        setQuery(tag.name) // 생성된 태그 이름으로 검색어 자동 등록
        await fetchAndSetTags() // 목록 즉시 갱신
        toast.success({
          title: '태그 등록 완료',
          content: `${tag.name} 태그가 등록되었습니다. 목록에서 선택해 주세요.`,
        })
        return tag
      } catch (e: unknown) {
        // 서버 에러
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
