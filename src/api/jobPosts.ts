import type { FetchJobPostsParams, JobPostsResponse } from '@src/types/jobPosts'
import { jobPosts } from '../mock/jobPosts'

// Mock API 함수 (추후 실제 API로 변경)
export async function fetchJobPosts({
  pageParam = 1,
  size = 10,
}: FetchJobPostsParams): Promise<JobPostsResponse> {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500))

  const startIndex = (pageParam - 1) * size
  const endIndex = startIndex + size
  const items = jobPosts.slice(startIndex, endIndex)

  return {
    items,
    hasNext: endIndex < jobPosts.length,
    totalCount: jobPosts.length,
  }
}
