export interface Review {
  id: number
  author: string
  rating: number
  comment: string
  date: string
}

export const mockReviews: Review[] = [
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

export const courseReviewsMap: Record<number, Review[]> = {
  1: mockReviews,
  2: [
    {
      id: 3,
      author: '이백엔드',
      rating: 5,
      comment: '클라우드 아키텍처에 대해 체계적으로 배울 수 있었습니다.',
      date: '2024-01-12',
    },
    {
      id: 4,
      author: '최인프라',
      rating: 4,
      comment: '실제 프로젝트에 적용하기 좋은 내용들이 많습니다.',
      date: '2024-01-08',
    },
  ],
}

export const getReviewsByCourseId = (courseId: number): Review[] => {
  return courseReviewsMap[courseId] || []
}
