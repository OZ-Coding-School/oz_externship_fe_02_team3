import { ChevronDown as ChevronDownIcon, Star as StarIcon } from 'lucide-react'

import Badge from '@components/Badge'
import Button from '@components/Button'
import Icon from '@components/Icon'
interface CardProps {
  cardTitle: string
  author: string
  cardDescription: string
  reviewRating: number
  reviewCount: number
  originalPrice: number
  price: number
}
function Card({
  cardTitle,
  author,
  cardDescription,
  reviewRating,
  reviewCount,
  originalPrice,
  price,
}: CardProps) {
  return (
    <div className="flex h-[516.86px] w-[389.33px] flex-col overflow-hidden rounded-xl border border-solid border-gray-200">
      <div className="relative flex h-[217.859px] flex-col bg-gray-100">
        <div className="h-[217.86px] w-full bg-cover bg-center bg-no-repeat" />
        <div className="absolute top-3 right-2 left-2 flex justify-between">
          <div className="flex flex-col items-start gap-4">
            <Badge badgeTitle="Udemy" sideClass="bg-primary-500 text-white" />
            <Badge badgeTitle="28% 할인" sideClass="bg-danger-500 text-white" />
          </div>
        </div>
      </div>
      <div className="flex h-[297px] flex-col p-5">
        <div className="pb-3">
          <Badge badgeTitle="클라우드" sideClass="bg-gray-100 text-gray-700" />
          <p className="pt-2 pb-1 text-lg leading-7 font-semibold text-gray-900">
            {cardTitle}
          </p>
          <p className="pb-2 text-sm text-gray-600">{author}</p>
          <p className="text-sm text-gray-500">{cardDescription}</p>
        </div>
        <div className="flex items-center pb-3">
          <div className="flex items-center pr-2">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                icon={StarIcon}
                className={
                  i < Math.floor(reviewRating)
                    ? 'stroke-primary-400 fill-primary-400'
                    : 'stroke-primary-400'
                }
                size="sm"
                fill={i < Math.floor(reviewRating)}
              />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-700">{reviewRating}</p>
          <p className="text-sm text-gray-500">({reviewCount}개 리뷰)</p>
        </div>
        <div className="flex items-center pb-4">
          <p className="text-xl font-bold text-gray-900">
            ₩{price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 line-through">
            ₩{originalPrice.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Icon
              icon={ChevronDownIcon}
              className="stroke-primary-600"
              size="sm"
            />
            <p className="text-primary-600 text-sm font-medium">리뷰 보기</p>
          </div>

          <Button buttonInnerText="강의보러가기" />
        </div>
      </div>
    </div>
  )
}

export default Card
