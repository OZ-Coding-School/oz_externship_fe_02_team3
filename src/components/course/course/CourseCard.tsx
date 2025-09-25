import { useState } from 'react'
import {
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
} from 'lucide-react'
import Badge from '@components/commons/Badge'
import Button from '@components/commons/button/Button'
import Icon from '@components/commons/Icon'
import StarRating from '../ui/StarRating'
import ReviewSection from '../sections/ReviewSection'
import { mockReviews, type Review } from '@src/mock/reviewData'
import type { Course } from '@src/types/course'

interface CourseCardProps extends Course {
  reviews?: Review[]
  onBookmarkClick?: (courseId: number, isBookmarked: boolean) => void
}
export default function CourseCard({
  id: courseId,
  title: cardTitle,
  author,
  description: cardDescription,
  reviewRating,
  reviewCount,
  originalPrice,
  price,
  reviews = mockReviews,
  onBookmarkClick,
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
    <div className="flex w-full flex-col overflow-hidden rounded-xl transition-all duration-300">
      {/* 강의 썸네일 */}
      <div className="relative flex aspect-video flex-col bg-gray-100">
        <div className="h-full w-full bg-cover bg-center bg-no-repeat" />
        <div className="absolute top-3 right-2 left-3 flex justify-between">
          <div className="flex flex-col items-start gap-4">
            <Badge badgeTitle="Udemy" className="bg-primary-500 text-white" />
            {isDiscounted && (
              <Badge
                badgeTitle={`${discountPercentage}% 할인`}
                className="bg-danger-500 text-white"
              />
            )}
          </div>
        </div>
      </div>

      {/* 강의 정보 */}
      <div className="flex flex-grow flex-col bg-white p-5">
        <div className="pb-3">
          <Badge badgeTitle="클라우드" className="bg-gray-100 text-gray-700" />
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
          <p className="flex gap-1">
            <span className="text-sm font-medium text-gray-700">
              {reviewRating}
            </span>
            <span className="text-sm text-gray-500">
              ({reviewCount}개 리뷰)
            </span>
          </p>
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
