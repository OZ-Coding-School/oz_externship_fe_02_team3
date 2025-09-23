import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { JobPost } from '@src/types/jobPosts'

interface FilterState {
  searchTerm: string
  selectedTag: string
  selectedSort: string

  // 상태 매서드
  setSearchTerm: (term: string) => void
  setSelectedTag: (tag: string) => void
  setSelectedSort: (sort: string) => void
  resetFilters: () => void
  applyFilters: (jobs: JobPost[]) => JobPost[]

  // 유틸리티 매서드
  hasActiveFilters: () => boolean
  getFilteredCount: (totalJobs: JobPost[]) => number
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      searchTerm: '',
      selectedTag: '전체 태그',
      selectedSort: '최신순',

      setSearchTerm: (term: string) => set({ searchTerm: term }),
      setSelectedTag: (tag: string) => set({ selectedTag: tag }),
      setSelectedSort: (sort: string) => set({ selectedSort: sort }),

      resetFilters: () =>
        set({
          searchTerm: '',
          selectedTag: '전체 태그',
          selectedSort: '최신순',
        }),

      // 활성 필터 확인
      hasActiveFilters: () => {
        const { searchTerm, selectedTag } = get()
        return searchTerm !== '' || selectedTag !== '전체 태그'
      },

      // 필터링된 결과 개수
      getFilteredCount: (totalJobs: JobPost[]) => {
        return get().applyFilters(totalJobs).length
      },

      applyFilters: (jobs: JobPost[]) => {
        const { searchTerm, selectedTag, selectedSort } = get()
        let filtered = jobs

        // 제목 검색
        if (searchTerm) {
          filtered = filtered.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }

        // 태그 필터
        if (selectedTag !== '전체 태그') {
          filtered = filtered.filter((job) => job.tags.includes(selectedTag))
        }

        // 정렬
        if (selectedSort === '최신순') {
          filtered = [...filtered].sort((a, b) => b.id - a.id)
        } else if (selectedSort === '오래된순') {
          filtered = [...filtered].sort((a, b) => a.id - b.id)
        } else if (selectedSort === '인기순') {
          filtered = [...filtered].sort((a, b) => b.viewCount - a.viewCount)
        }

        return filtered
      },
    }),
    {
      name: 'recruitment-filters', // localStorage key
      partialize: (state) => ({
        selectedTag: state.selectedTag,
        selectedSort: state.selectedSort,
      }),
    }
  )
)
