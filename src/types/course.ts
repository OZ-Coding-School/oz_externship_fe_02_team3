export interface Course {
  id: number
  title: string
  author: string
  description: string
  reviewRating: number
  reviewCount: number
  originalPrice: number
  price: number
  image?: string
  category: string
  platform: string
  discountPercentage?: number
  isBestseller?: boolean

  instructor?: string
  rating?: number
  provider?: string
}

export const normalizeCourse = (course: any): Course => {
  return {
    ...course,
    instructor: course.instructor || course.author,
    rating: course.rating || course.reviewRating,
    provider: course.provider || course.platform,
  }
}

export const denormalizeCourse = (course: Course) => {
  return {
    ...course,
    author: course.author || course.instructor,
    reviewRating: course.reviewRating || course.rating,
    platform: course.platform || course.provider,
  }
}

// 추천 강의 로직
export const getRecommendedCourses = (
  courses: Course[],
  limit: number = 4
): Course[] => {
  return courses
    .filter((course) => course.reviewRating >= 4.7)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit)
}

// 카테고리 목록
export const categories = [
  '전체',
  '프론트엔드',
  'JavaScript',
  'React',
  '백엔드',
  '클라우드',
  'DevOps',
  '데이터분석',
  '데이터사이언스',
  '게임개발',
  '모바일',
]
