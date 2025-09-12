import { Bookmark as BookmarkIcon, Send as SendIcon } from 'lucide-react'
import Button from '@components/commons/button/Button'

interface BannerButtensProps {
  onBookmark?: () => void
  onClick?: () => void
}

export function BannerButtens({ onBookmark, onClick }: BannerButtensProps) {
  return (
    <div className="flex gap-3">
      <Button
        icon={BookmarkIcon}
        variant="outline"
        aria-label="북마크"
        className="rounded-md"
        onClick={onBookmark}
      />
      <Button
        icon={SendIcon}
        iconSize="sm"
        buttonInnerText="지원하기"
        aria-label="지원하기"
        className="w-[130px] text-base font-normal"
        onClick={onClick}
      />
    </div>
  )
}
