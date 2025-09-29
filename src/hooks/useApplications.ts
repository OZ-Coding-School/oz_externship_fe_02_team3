// src/hooks/useApplications.ts
import { useEffect, useState, useCallback } from 'react'
import type { ApplicationsItem } from '@src/types/applicant'
import { useToast } from '@src/components/commons/toast'
import { AxiosError } from 'axios'
import { getApplications } from '@src/api/application'

export function useApplications(recruitmentUuid: string, open: boolean) {
  const toast = useToast()
  const [items, setItems] = useState<ApplicationsItem[]>([])
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  // 목록 초기 로드
  useEffect(() => {
    if (!open || !recruitmentUuid) return
    ;(async () => {
      setLoading(true)
      try {
        const data = await getApplications(recruitmentUuid)
        setItems(data.results ?? [])
        setNextCursor(data.next_cursor ?? null)
      } catch (e) {
        const err = e as AxiosError<{ detail?: string }>
        toast.error({
          title: '지원자 목록 불러오기 실패',
          content: err.response?.data?.detail ?? '잠시 후 다시 시도해 주세요.',
        })
        setItems([])
        setNextCursor(null)
      } finally {
        setLoading(false)
      }
    })()
  }, [open, recruitmentUuid, toast])

  // 다음 페이지 불러오기
  const fetchNext = useCallback(async () => {
    if (!nextCursor || loadingMore) return
    setLoadingMore(true)
    try {
      const data = await getApplications(recruitmentUuid, nextCursor)
      setItems((prev) => [...prev, ...(data.results ?? [])])
      setNextCursor(data.next_cursor ?? null)
    } catch (e) {
      const err = e as AxiosError<{ detail?: string }>
      toast.error({
        title: '추가 불러오기 실패',
        content: err.response?.data?.detail ?? '잠시 후 다시 시도해 주세요.',
      })
    } finally {
      setLoadingMore(false)
    }
  }, [nextCursor, recruitmentUuid, loadingMore, toast])

  return {
    items,
    loading,
    loadingMore,
    fetchNext,
    hasNext: !!nextCursor,
    setItems,
  }
}
