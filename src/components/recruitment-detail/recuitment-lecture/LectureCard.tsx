import type { Lecture } from '@src/types/post'
import { ArrowRight as ArrowRightIcon } from 'lucide-react'

export interface LectureCardProps {
  lecture: Lecture
}

export default function LectureCard({ lecture }: LectureCardProps) {
  return (
    <div className="overflow-hidden rounded border border-gray-200">
      <img
        src={lecture.thumbnail_image_url}
        alt="강의 이미지"
        className="h-48 w-full object-cover"
      />
      <div className="p-6">
        <h5 className="mb-2 text-lg font-semibold">{lecture.name}</h5>
        <p className="mb-3 text-gray-600">강사: {lecture.instructor}</p>
        <div className="text-primary-600 flex items-center justify-between">
          <h4 className="text-xl font-semibold">{lecture.price}</h4>
          <a href={lecture.url} className="flex items-center hover:underline">
            강의 보기 <ArrowRightIcon className="h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
