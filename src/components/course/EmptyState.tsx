interface EmptyStateProps {
  title?: string
  description?: string
  iconEmoji?: string
}

export function EmptyState({
  title = '검색 결과가 없습니다.',
  description = '다른 검색어나 필터를 시도해보세요.',
  iconEmoji = '📚',
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="mb-4 text-6xl text-gray-400">{iconEmoji}</div>
        <h3 className="text-lg font-medium text-gray-500">{title}</h3>
        <p className="mt-2 text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}
