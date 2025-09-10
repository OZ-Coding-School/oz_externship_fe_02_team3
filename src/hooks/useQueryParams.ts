import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

type QueryParamValue = string | number | boolean | undefined | null

type QueryParams = Record<string, QueryParamValue>

export function useQueryParams<T extends QueryParams = QueryParams>() {
  const [sp, setSp] = useSearchParams()

  const get = useMemo(() => {
    const obj: Record<string, string> = {}
    sp.forEach((v, k) => (obj[k] = v))
    return obj as T
  }, [sp])

  const set = useCallback(
    (next: Partial<T>) => {
      const merged = new URLSearchParams(sp)
      Object.entries(next).forEach(([k, v]) => {
        if (v === undefined || v === null || v === '') merged.delete(k)
        else merged.set(k, String(v))
      })
      setSp(merged, { replace: true })
    },
    [sp, setSp]
  )

  return { get, set }
}
