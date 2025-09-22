import StarRating from '../ui/StarRating'
import type { Review } from '@src/mock/reviewData'

interface ReviewItemProps {
  review: Review
}

function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">
            {review.author}
          </span>
          <StarRating rating={review.rating} />
        </div>
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">{review.comment}</p>
    </div>
  )
}

interface ReviewSectionProps {
  reviews: Review[]
  isExpanded: boolean
}

export default function ReviewSection({
  reviews,
  isExpanded,
}: ReviewSectionProps) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="border-t border-gray-200 pt-4">
        <h4 className="mb-3 text-sm font-semibold text-gray-900">
          최근 리뷰 ({reviews.length}개)
        </h4>
        <div className="max-h-64 space-y-3 overflow-y-auto">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}
