import { useInfiniteQuery } from '@tanstack/react-query'
import {
  fetchRecruitments,
  type ListParams,
  type ListResponse,
} from './recruitments.list'

export function useRecruitments(params: Omit<ListParams, 'page' | 'baseUrl'>) {
  return useInfiniteQuery<ListResponse, Error>({
    queryKey: ['recruitments', params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchRecruitments({ ...params, page: pageParam as number }),
    getNextPageParam: (last) => {
      if (!last.next) return undefined
      try {
        const u = new URL(last.next, window.location.origin)
        const next = Number(u.searchParams.get('page') || '0')
        return next > 0 ? next : undefined
      } catch {
        return undefined
      }
    },
    refetchOnWindowFocus: false,
  })
}
