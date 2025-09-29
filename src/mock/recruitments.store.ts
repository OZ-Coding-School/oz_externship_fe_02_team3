import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { JobPost } from '@src/types/jobPosts'

interface FilterState {
  searchTerm: string
  selectedTag: string
  selectedSort: string
  setSearchTerm: (term: string) => void
  setSelectedTag: (tag: string) => void
  setSelectedSort: (sort: string) => void
  resetFilters: () => void
  applyFilters: (jobs: JobPost[]) => JobPost[]
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

      hasActiveFilters: () => {
        const { searchTerm, selectedTag } = get()
        return searchTerm !== '' || selectedTag !== '전체 태그'
      },

      getFilteredCount: (totalJobs: JobPost[]) =>
        get().applyFilters(totalJobs).length,

      applyFilters: (jobs: JobPost[]) => {
        const { searchTerm, selectedTag, selectedSort } = get()
        let filtered = jobs

        if (searchTerm) {
          filtered = filtered.filter((job) =>
            (job.title ?? '').toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
        if (selectedTag !== '전체 태그') {
          filtered = filtered.filter((job) =>
            (job.tags ?? []).includes(selectedTag)
          )
        }

        const keyFor = (j: JobPost) => Number(j.id ?? Number.MIN_SAFE_INTEGER)

        if (selectedSort === '최신순') {
          filtered = [...filtered].sort((a, b) => keyFor(b) - keyFor(a))
        } else if (selectedSort === '오래된순') {
          filtered = [...filtered].sort((a, b) => keyFor(a) - keyFor(b))
        } else if (selectedSort === '인기순') {
          filtered = [...filtered].sort(
            (a, b) => Number(b.viewCount ?? 0) - Number(a.viewCount ?? 0)
          )
        }

        return filtered
      },
    }),
    {
      name: 'recruitment-filters',
      partialize: (state) => ({
        selectedTag: state.selectedTag,
        selectedSort: state.selectedSort,
      }),
    }
  )
)
