import { useQuery } from '@tanstack/react-query'
import { fetchCourses } from '@src/api/courses'
import type { CoursesQuery } from '@src/types/course'
import { useQueryParams } from '@src/hooks/useQueryParams'

function CoursesPage() {
  const { get, set } = useQueryParams<CoursesQuery>()
  const page = Number(get.page ?? 1)
  const pageSize = Number(get.pageSize ?? 9)

  const query: CoursesQuery = {
    q: get.q ?? '',
    category: get.category ?? '',
    sort: (get, sort as CoursesQuery['sort']) ?? 'popular',
    page,
    pageSize,
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['courses', query],
    queryFn: () => fetchCourses(query),
    staleTime: 60_000,
    keepPreviousData: true,
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {/* 상단 헤더 */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">IT 강의목록</h1>
        <p className="text-sm text-gray-500">
          원하는 강의를 검색하고 필터링하세요
        </p>
      </header>

      {/* 필터/검색/정렬 바 */}
      <FiltersBar value={query} onChange={(next) => set(next)} />

      {/* 그리드 */}
      {isLoading && (
        <p className="py-10 text-center text-gray-500">불러오는 중</p>
      )}
      {isError && (
        <p className="py-10 text-center text-red-500">목록을 불러옵니다</p>
      )}
      {data && (
        <>
          <CourseGrid items={data.items} />
          <Pagination
            page={data.page}
            pageSize={data.pageSize}
            total={data.total}
            onPageChange={(p) => set({ page: p })}
          />
        </>
      )}
    </main>
  )
}

export default CoursesPage
