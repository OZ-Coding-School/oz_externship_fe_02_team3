import { useMemo, useEffect, useState } from 'react'
import {
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
} from '@tanstack/react-query'
import {
  fetchMyRecruitments,
  type RecruitmentMeResponse,
  type RecruitmentMeItem,
  type MeParams,
  fetchRecruitmentsCount,
} from '@src/api/recManage'
import RecManageFilter from '@src/components/recruitment-manage/components/RecManageFilter'
import RecManageHeader from '@src/components/recruitment-manage/components/RecManageHeader'
import RecManageList from '@src/components/recruitment-manage/components/RecManageList'
import RecManageTotalCard from '@src/components/recruitment-manage/components/RecManageTotalCard'

type StatusUI = 'ALL' | 'OPEN' | 'CLOSED'
type OrderingUI = 'latest' | 'views' | 'bookmarks'
const orderingMap: Record<OrderingUI, string> = {
  latest: '-created_at',
  views: '-views_count',
  bookmarks: '-bookmarks_count',
}

export default function RecruitmentManage() {
  const [status, setStatus] = useState<StatusUI>('ALL')
  const [ordering, setOrdering] = useState<OrderingUI>('latest')
  const pageSize = 10

  const baseParams: Omit<MeParams, 'page'> = useMemo(
    () => ({
      size: pageSize,
      ordering: orderingMap[ordering],
      is_closed: status === 'ALL' ? undefined : status === 'CLOSED',
    }),
    [ordering, status]
  )

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<
    RecruitmentMeResponse,
    Error,
    InfiniteData<RecruitmentMeResponse>,
    [string, Omit<MeParams, 'page'>],
    number
  >({
    queryKey: ['myRecruitments', baseParams],
    queryFn: ({ pageParam }) =>
      fetchMyRecruitments({ ...baseParams, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined
      try {
        const u = new URL(lastPage.next, window.location.origin)
        const next = Number(u.searchParams.get('page') || '0')
        return next > 0 ? next : undefined
      } catch {
        return undefined
      }
    },
    refetchOnWindowFocus: false,
  })

  const flat: RecruitmentMeItem[] = data?.pages.flatMap((p) => p.results) ?? []

  useEffect(() => {
    window.scrollTo({ top: 0 })
    refetch()
  }, [status, ordering, refetch])

  const { data: totalCnt = 0 } = useQuery({
    queryKey: ['recCount', 'all'],
    queryFn: () => fetchRecruitmentsCount({ is_closed: null }),
    staleTime: 60_000,
  })

  const { data: openCnt = 0 } = useQuery({
    queryKey: ['recCount', 'open'],
    queryFn: () => fetchRecruitmentsCount({ is_closed: false }),
    staleTime: 60_000,
  })

  const { data: closedCnt = 0 } = useQuery({
    queryKey: ['recCount', 'closed'],
    queryFn: () => fetchRecruitmentsCount({ is_closed: true }),
    staleTime: 60_000,
  })

  const display = useMemo(() => {
    const totalForFilter =
      status === 'ALL' ? totalCnt : status === 'OPEN' ? openCnt : closedCnt

    const openForFilter =
      status === 'ALL' ? openCnt : status === 'OPEN' ? openCnt : 0

    const closedForFilter =
      status === 'ALL' ? closedCnt : status === 'CLOSED' ? closedCnt : 0

    return {
      total: totalForFilter,
      open: openForFilter,
      closed: closedForFilter,
    }
  }, [status, totalCnt, openCnt, closedCnt])
  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto h-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-20">
        <div className="max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="rec-manage-section h-[80px]">
            <RecManageHeader />
          </div>

          <div className="rec-manage-section">
            <RecManageTotalCard
              total={totalCnt}
              open={openCnt}
              closed={closedCnt}
            />
          </div>

          <div className="rec-manage-section">
            <RecManageFilter
              status={status}
              ordering={ordering}
              onChangeStatus={setStatus}
              onChangeOrdering={setOrdering}
            />
          </div>

          <div className="rec-manage-section">
            <RecManageList
              items={flat}
              loading={isLoading}
              hasNextPage={!!hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onLoadMore={fetchNextPage}
              totalCount={display.total}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
