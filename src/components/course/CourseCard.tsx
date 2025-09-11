import { useState } from 'react'
import {
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Star as StarIcon,
} from 'lucide-react'
import Badge from '@components/commons/Badge'
import Button from '@components/commons/button/Button'
import Icon from '@components/commons/Icon'

interface Review {
  id: number
  author: string
  rating: number
  comment: string
  date: string
}

interface CourseCardProps {
  cardTitle: string
  author: string
  cardDescription: string
  reviewRating: number
  reviewCount: number
  originalPrice: number
  price: number
  reviews?: Review[]
}

// 모크 리뷰 데이터
const mockReviews: Review[] = [
  {
    id: 1,
    author: '김개발자',
    rating: 5,
    comment:
      '정말 유익한 강의였습니다. AWS의 기초부터 고급까지 잘 설명되어 있어요.',
    date: '2024-01-15',
  },
  {
    id: 2,
    author: '박클라우드',
    rating: 4,
    comment: '실무에 바로 적용할 수 있는 내용들이 많아서 좋았습니다.',
    date: '2024-01-10',
  },
]

// 별점 렌더링 컴포넌트
interface StarRatingProps {
  rating: number
  className?: string
}

function StarRating({ rating, className = '' }: StarRatingProps) {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        icon={StarIcon}
        className={
          i < Math.floor(rating)
            ? 'stroke-primary-400 fill-primary-400'
            : 'stroke-primary-400'
        }
        size="sm"
        fill={i < Math.floor(rating)}
      />
    ))
  }

  return <div className={`flex items-center ${className}`}>{renderStars()}</div>
}

// 리뷰 섹션 컴포넌트
interface ReviewSectionProps {
  reviews: Review[]
  isExpanded: boolean
}

function ReviewSection({ reviews, isExpanded }: ReviewSectionProps) {
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
            <div key={review.id} className="rounded-lg bg-gray-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {review.author}
                  </span>
                  <StarRating rating={review.rating} />
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CourseCard({
  cardTitle,
  author,
  cardDescription,
  reviewRating,
  reviewCount,
  originalPrice,
  price,
  reviews = mockReviews,
}: CourseCardProps) {
  const [isReviewExpanded, setIsReviewExpanded] = useState(false)

  const isDiscounted = originalPrice > price && originalPrice !== price
  const discountPercentage = isDiscounted
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const toggleReviews = () => {
    setIsReviewExpanded(!isReviewExpanded)
  }

  return (
    <div className="flex w-full max-w-sm flex-col overflow-hidden rounded-xl border border-solid border-gray-200 transition-all duration-300">
      {/* 강의 썸네일 */}
      <div className="relative flex aspect-video flex-col bg-gray-100">
        <div className="h-full w-full bg-cover bg-center bg-no-repeat" />
        <div className="absolute top-3 right-2 left-2 flex justify-between">
          <div className="flex flex-col items-start gap-4">
            <Badge badgeTitle="Udemy" sideClass="bg-primary-500 text-white" />
            {isDiscounted && (
              <Badge
                badgeTitle={`${discountPercentage}% 할인`}
                sideClass="bg-danger-500 text-white"
              />
            )}
          </div>
        </div>
      </div>

      {/* 강의 정보 */}
      <div className="flex flex-grow flex-col p-5">
        <div className="pb-3">
          <Badge badgeTitle="클라우드" sideClass="bg-gray-100 text-gray-700" />
          <p className="line-clamp-2 pt-2 pb-1 text-lg leading-7 font-semibold text-gray-900">
            {cardTitle}
          </p>
          <p className="pb-2 text-sm text-gray-600">{author}</p>
          <p className="line-clamp-3 text-sm text-gray-500">
            {cardDescription}
          </p>
        </div>

        {/* 평점 */}
        <div className="flex items-center pb-3">
          <StarRating rating={reviewRating} className="pr-2" />
          <p className="text-sm font-medium text-gray-700">{reviewRating}</p>
          <p className="text-sm text-gray-500">({reviewCount}개 리뷰)</p>
        </div>

        {/* 가격 */}
        <div className="flex items-center pb-4">
          <p className="mr-2 text-xl font-bold text-gray-900">
            ₩{price.toLocaleString()}
          </p>
          {isDiscounted && (
            <p className="text-sm text-gray-500 line-through">
              ₩{originalPrice.toLocaleString()}
            </p>
          )}
        </div>

        {/* 액션 버튼들 */}
        <div className="flex items-center justify-between">
          <button
            onClick={toggleReviews}
            className="text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
          >
            <Icon
              icon={isReviewExpanded ? ChevronUpIcon : ChevronDownIcon}
              className="stroke-current"
              size="sm"
            />
            <p className="text-sm font-medium">
              {isReviewExpanded ? '리뷰 접기' : '리뷰 보기'}
            </p>
          </button>
          <Button buttonInnerText="강의보러가기" />
        </div>

        {/* 리뷰 섹션 */}
        <ReviewSection reviews={reviews} isExpanded={isReviewExpanded} />
      </div>
    </div>
  )
}

export default CourseCard
