import { Bookmark } from 'lucide-react'

function BookMarkButton() {
  return (
    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
      <div className="flex h-[28px] w-[18.77px] items-center justify-center">
        <Bookmark className="stroke-gray-600" />
      </div>
    </button>
  )
}

export default BookMarkButton
