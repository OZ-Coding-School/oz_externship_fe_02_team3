import { Bookmark as BookmarkIcon } from 'lucide-react'
import Button from './button/Button'

function BookMarkButton() {
  return (
    <Button
      icon={BookmarkIcon}
      variant="outline"
      iconButtonSize="lg"
      ariaLabel="북마크"
      iconClassName="stroke-gray-600"
      className="rounded-lg bg-white/90"
    />
  )
}

export default BookMarkButton
