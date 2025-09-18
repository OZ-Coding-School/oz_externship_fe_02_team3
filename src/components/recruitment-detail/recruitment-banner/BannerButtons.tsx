import {
  Bookmark as BookmarkIcon,
  Send as SendIcon,
  Share2 as ShareIcon,
} from 'lucide-react'
import Button from '@components/commons/button/Button'

interface BannerButtonsProps {
  onShare?: () => void
  onBookmark?: () => void
  onClick?: () => void
}

export function BannerButtons({
  onShare,
  onBookmark,
  onClick,
}: BannerButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        icon={ShareIcon}
        variant="outline"
        aria-label="공유하기"
        className="rounded-md"
        onClick={onShare}
      />
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
