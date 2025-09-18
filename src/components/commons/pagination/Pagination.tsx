import { cn } from '@src/utils/cn'
import Button from '../button/Button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface PaginationProps {
  page: number //현재페이지
  totalCount: number //총 페이지 수
  size?: number //페이지당 아이템 수 (기본 5)
  onPageChange: (page: number) => void
  className?: string
}

export default function Pagination({
  page,
  totalCount,
  size = 5,
  onPageChange,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / size)
  const groupSize = 10
  const currentGroup = Math.floor((page - 1) / groupSize) // 0부터 시작
  const start = currentGroup * groupSize + 1
  const end = Math.min(start + groupSize - 1, totalPages)

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  if (totalPages <= 1) return null // 페이지가 하나면 안보여줌

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 text-xs',
        className
      )}
    >
      <Button
        icon={ChevronLeftIcon}
        iconSize="sm"
        variant="outline"
        iconClassName="text-gray-500"
        className="h-9 w-9 rounded-lg border border-gray-200"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="이전 페이지"
      />
      {pages.map((pageNum) => (
        <Button
          key={pageNum}
          buttonInnerText={String(pageNum)}
          size="base"
          variant={pageNum === page ? 'primary' : 'outline'}
          onClick={() => onPageChange(pageNum)}
          className={cn(
            'h-9 w-9 rounded-lg p-0 tabular-nums',
            pageNum === page ? '' : 'border border-gray-200'
          )}
          aria-current={pageNum === page ? 'page' : undefined}
        />
      ))}
      <Button
        icon={ChevronRightIcon}
        iconSize="sm"
        variant="outline"
        iconClassName="text-gray-500"
        className="h-9 w-9 rounded-lg border border-gray-200"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="다음 페이지"
      />
    </div>
  )
}
