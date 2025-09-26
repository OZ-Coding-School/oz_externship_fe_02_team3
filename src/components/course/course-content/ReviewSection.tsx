import StarRating from './StarRating'
import type { Review } from '@src/mock/reviewData'

interface ReviewItemProps {
  review: Review
}

function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StarRating rating={review.reviews_rating} />
          <span className="text-sm font-medium text-gray-900">
            {review.reviews_rating}
          </span>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">
        {review.reviews_content}
      </p>
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
        <h4 className="mb-3 text-sm font-semibold text-gray-900">최근 리뷰</h4>
        <div className="max-h-64 space-y-3 overflow-y-auto">
          {reviews.map((review) => (
            <ReviewItem key={review.reviews_id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}
