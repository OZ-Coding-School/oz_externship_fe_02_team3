import DropDown from '@src/components/commons/dropdown/DropDown'

type Status = 'ALL' | 'OPEN' | 'CLOSED'
type Ordering = 'latest' | 'views' | 'bookmarks'

const statusOptions = [
  { id: 1, name: '전체' },
  { id: 2, name: '모집중' },
  { id: 3, name: '마감됨' },
] as const

const statusById: Record<(typeof statusOptions)[number]['id'], Status> = {
  1: 'ALL',
  2: 'OPEN',
  3: 'CLOSED',
}
const idByStatus: Record<Status, (typeof statusOptions)[number]['id']> = {
  ALL: 1,
  OPEN: 2,
  CLOSED: 3,
}

const sortOptions = [
  { id: 1, name: '최신순' },
  { id: 2, name: '조회수 높은 순' },
  { id: 3, name: '북마크 많은 순' },
] as const

const orderingById: Record<(typeof sortOptions)[number]['id'], Ordering> = {
  1: 'latest',
  2: 'views',
  3: 'bookmarks',
}
const idByOrdering: Record<Ordering, (typeof sortOptions)[number]['id']> = {
  latest: 1,
  views: 2,
  bookmarks: 3,
}

export default function RecManageFilter({
  status,
  ordering,
  onChangeStatus,
  onChangeOrdering,
}: {
  status: Status
  ordering: Ordering
  onChangeStatus: (s: Status) => void
  onChangeOrdering: (o: Ordering) => void
}) {
  const selectedStatusLabel =
    statusOptions.find((o) => o.id === idByStatus[status])?.name ?? ''
  const selectedOrderingLabel =
    sortOptions.find((o) => o.id === idByOrdering[ordering])?.name ?? ''

  return (
    <div className="w-full max-w-[1216px] rounded-xl bg-white p-6 ring-1 ring-gray-200">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-gray-700">상태</p>
          <DropDown
            selected={selectedStatusLabel}
            options={statusOptions as unknown as { id: number; name: string }[]}
            onSelect={(label: string) => {
              const found = statusOptions.find((o) => o.name === label)
              if (found) onChangeStatus(statusById[found.id])
            }}
            placeholder="전체"
          />
        </div>

        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-gray-700">정렬</p>
          <DropDown
            selected={selectedOrderingLabel}
            options={sortOptions as unknown as { id: number; name: string }[]}
            onSelect={(label: string) => {
              const found = sortOptions.find((o) => o.name === label)
              if (found) onChangeOrdering(orderingById[found.id])
            }}
            placeholder="최신순"
          />
        </div>
      </div>
    </div>
  )
}
