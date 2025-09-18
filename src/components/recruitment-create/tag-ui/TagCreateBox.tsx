import Button from '@src/components/commons/button/Button'
import { EmptyState } from '@src/components/commons/EmptyState'

interface TagCreateBoxProps {
  value: string
  onCreate?: (name: string) => Promise<void> | void
  loading?: boolean
}
export default function TagCreateBox({
  value,
  onCreate,
  loading,
}: TagCreateBoxProps) {
  const handleClick = async () => {
    await onCreate?.(value.trim())
  }
  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <EmptyState
        iconType="TAG"
        iconClassName="text-gray-400"
        description="다른 키워드로 검색하거나 새 태그를 등록해 보세요"
        iconContainerClassName="bg-gray-100 rounded-full w-14 h-14 flex items-center mb-3"
        descClassName="text-sm"
        titleClassName="text-gray-800 font-medium text-md"
        wrapperClassName="flex-1 p-0"
      />
      <div className="border-primary-300 bg-primary-50/80 flex items-start justify-between rounded-xl border-2 border-dashed p-4">
        <div>
          <p className="text-primary-900 pb-1 text-sm font-medium tracking-wider">
            {`'${value}'`} 태그를 새로 만드시겠습니까?
          </p>
          <p className="text-primary-600 text-xs">
            검색 결과에 원하는 태그가 없는 경우 새로 등록할 수 있습니다.
          </p>
        </div>
        <Button
          buttonInnerText={loading ? '...등록중' : '새로 등록하기'}
          onClick={handleClick}
          disabled={loading || !value.trim()}
        />
      </div>
    </div>
  )
}
