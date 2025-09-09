import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { fetchJobPosts } from '@api/jobPosts'
import type { JobPostsResponse } from '@src/types/jobPosts'

// 초기 10개 데이터를 가져오는 훅
export function useInitialJobPosts() {
  return useQuery<JobPostsResponse>({
    queryKey: ['jobPosts', 'initial'],
    queryFn: () => fetchJobPosts({ pageParam: 1 }),
  })
}

interface UseInfiniteJobPostsOptions {
  enabled: boolean
  initialData?: JobPostsResponse
}

// 무한 스크롤용 데이터 관리
export function useInfiniteJobPosts({
  enabled,
  initialData,
}: UseInfiniteJobPostsOptions) {
  return useInfiniteQuery<JobPostsResponse>({
    queryKey: ['jobPosts', 'infinite'],
    queryFn: ({ pageParam }) =>
      fetchJobPosts({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
    enabled,
    initialData: initialData
      ? { pages: [initialData], pageParams: [1] }
      : undefined,
  })
}
