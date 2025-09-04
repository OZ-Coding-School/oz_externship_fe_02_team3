import { Bookmark as BookmarkIcon } from 'lucide-react'

function BookMarkButton() {
  return (
    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
      <div className="flex h-[28px] w-[18.77px] items-center justify-center">
        <BookmarkIcon className="stroke-gray-600" />
      </div>
    </button>
  )
}

export default BookMarkButton
