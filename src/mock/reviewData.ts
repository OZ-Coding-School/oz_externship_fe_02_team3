export interface Review {
  reviews_id: number
  reviews_rating: number
  reviews_content: string
}

export const mockReviews: Review[] = [
  {
    reviews_id: 1,
    reviews_rating: 5,
    reviews_content:
      '정말 유익한 강의였습니다. AWS의 기초부터 고급까지 잘 설명되어 있어요.',
  },
  {
    reviews_id: 2,
    reviews_rating: 4,
    reviews_content: '실무에 바로 적용할 수 있는 내용들이 많아서 좋았습니다.',
  },
]

export const courseReviewsMap: Record<number, Review[]> = {
  1: mockReviews,
  2: [
    {
      reviews_id: 3,
      reviews_rating: 5,
      reviews_content:
        '클라우드 아키텍처에 대해 체계적으로 배울 수 있었습니다.',
    },
    {
      reviews_id: 4,
      reviews_rating: 4,
      reviews_content: '실제 프로젝트에 적용하기 좋은 내용들이 많습니다.',
    },
  ],
}

export const getReviewsByCourseId = (courseId: number): Review[] => {
  return courseReviewsMap[courseId] || []
}
