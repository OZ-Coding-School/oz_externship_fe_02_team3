import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PostgrestError } from '@supabase/supabase-js'
import type { Tag } from '@src/types/tag'
import { supa } from '@src/lib/supabase'

type FetchState = 'idle' | 'loading' | 'done' | 'error'

function isPostgrestError(e: unknown): e is PostgrestError {
  return typeof e === 'object' && e !== null && 'code' in e && 'message' in e
}

export function useTagManager(open: boolean, size: number = 5) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Tag[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState<FetchState>('idle')
  const [creating, setCreating] = useState(false)
  const [justCreatedId, setJustCreatedId] = useState<number | null>(null)

  const lastFetchKey = useRef<string>('')

  const range = useMemo(() => {
    const from = (page - 1) * size
    const to = from + size - 1
    return { from, to }
  }, [page, size])

  const fetchTags = useCallback(async () => {
    if (!open) return
    setLoading('loading')

    const key = JSON.stringify({ q: query, page, size })
    if (lastFetchKey.current === key) {
      setLoading('done')
      return
    }
    lastFetchKey.current = key

    const { from, to } = range

    const base = supa
      .from('tags')
      .select('id, name', { count: 'exact' })
      .order('created_at', { ascending: false })

    const builder = query.trim()
      ? base.ilike('name', `%${query.trim()}%`)
      : base

    const { data, count: total, error } = await builder.range(from, to)
    if (error) {
      setLoading('error')
      return
    }
    setItems((data ?? []) as Tag[])
    setCount(total ?? 0)
    setLoading('done')
  }, [open, page, size, query, range])

  useEffect(() => {
    if (!open) return
    fetchTags()
  }, [open, fetchTags])

  useEffect(() => {
    if (!open) return
    fetchTags()
  }, [query, page, fetchTags, open])

  const register = useCallback(
    async (name: string): Promise<Tag | null> => {
      if (!name.trim()) return null
      setCreating(true)
      setJustCreatedId(null)

      const { data: inserted, error: insertErr } = await supa
        .from('tags')
        .insert({ name: name.trim() })
        .select('id, name')
        .single()

      if (!insertErr && inserted) {
        setCreating(false)
        setJustCreatedId(inserted.id)
        await fetchTags()
        return inserted as Tag
      }

      const pgCode = isPostgrestError(insertErr) ? insertErr.code : undefined
      if (pgCode === '23505') {
        const { data: existing, error: selectErr } = await supa
          .from('tags')
          .select('id, name')
          .eq('name', name.trim())
          .single()

        setCreating(false)

        if (selectErr || !existing) {
          return null
        }

        setJustCreatedId(existing.id)
        await fetchTags()
        return existing as Tag
      }

      setCreating(false)
      return null
    },
    [fetchTags]
  )

  return {
    query,
    setQuery,
    page,
    setPage,
    items,
    count,
    loading: loading === 'loading',
    creating,
    justCreatedId,
    register,
  }
}
