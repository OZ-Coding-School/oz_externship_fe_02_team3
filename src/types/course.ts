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

// Mock 데이터
export const mockCoursesData: Course[] = [
  {
    id: 1,
    title: 'Vue.js 완벽 가이드',
    author: '김개발',
    description:
      'Vue.js의 기초부터 고급 기능까지 완벽하게 마스터하는 강의입니다.',
    reviewRating: 4.8,
    reviewCount: 1253,
    originalPrice: 89000,
    price: 64000,
    category: '프론트엔드',
    platform: 'Udemy',
    discountPercentage: 28,
    isBestseller: true,
    instructor: '김개발',
    rating: 4.8,
    provider: 'Udemy',
  },
  {
    id: 2,
    title: 'AWS 클라우드 아키텍처',
    author: '최자바',
    description: 'AWS를 활용한 확장 가능한 클라우드 아키텍처 설계를 배웁니다.',
    reviewRating: 4.7,
    reviewCount: 856,
    originalPrice: 120000,
    price: 86000,
    category: '클라우드',
    platform: 'Udemy',
    discountPercentage: 28,
    instructor: '최자바',
    rating: 4.7,
    provider: 'Udemy',
  },
  {
    id: 3,
    title: 'JavaScript ES6+ 완전정복',
    author: '박스크립트',
    description: 'JavaScript의 최신 문법과 고급 개념을 완전히 정복합니다.',
    reviewRating: 4.9,
    reviewCount: 2041,
    originalPrice: 75000,
    price: 54000,
    category: 'JavaScript',
    platform: 'Udemy',
    discountPercentage: 28,
    isBestseller: true,
    instructor: '박스크립트',
    rating: 4.9,
    provider: 'Udemy',
  },
  {
    id: 4,
    title: 'React 실전 프로젝트',
    author: '이리액트',
    description: 'React를 활용한 실전 프로젝트로 포트폴리오를 완성하세요.',
    reviewRating: 4.6,
    reviewCount: 1847,
    originalPrice: 95000,
    price: 68000,
    category: 'React',
    platform: 'Udemy',
    discountPercentage: 28,
    instructor: '이리액트',
    rating: 4.6,
    provider: 'Udemy',
  },
  {
    id: 5,
    title: 'Python 데이터 분석',
    author: '정파이썬',
    description: 'Python을 활용한 데이터 분석과 시각화 완벽 가이드입니다.',
    reviewRating: 4.5,
    reviewCount: 634,
    originalPrice: 110000,
    price: 79000,
    category: '데이터분석',
    platform: 'Udemy',
    discountPercentage: 28,
    instructor: '정파이썬',
    rating: 4.5,
    provider: 'Udemy',
  },
  {
    id: 6,
    title: 'Node.js 백엔드 개발',
    author: '홍노드',
    description:
      'Node.js로 확장 가능한 백엔드 서버를 구축하는 방법을 배웁니다.',
    reviewRating: 4.7,
    reviewCount: 923,
    originalPrice: 88000,
    price: 63000,
    category: '백엔드',
    platform: 'Udemy',
    discountPercentage: 28,
    isBestseller: true,
    instructor: '홍노드',
    rating: 4.7,
    provider: 'Udemy',
  },
  {
    id: 7,
    title: 'Docker & Kubernetes 완벽가이드',
    author: '김도커',
    description:
      'Docker와 Kubernetes를 활용한 컨테이너 오케스트레이션을 마스터합니다.',
    reviewRating: 4.8,
    reviewCount: 1456,
    originalPrice: 130000,
    price: 94000,
    category: 'DevOps',
    platform: 'Udemy',
    discountPercentage: 28,
    instructor: '김도커',
    rating: 4.8,
    provider: 'Udemy',
  },
  {
    id: 8,
    title: 'Unity 게임 개발 실전',
    author: '신유니티',
    description: 'Unity를 활용한 2D/3D 게임 개발의 모든 것을 배웁니다.',
    reviewRating: 4.6,
    reviewCount: 789,
    originalPrice: 105000,
    price: 76000,
    category: '게임개발',
    platform: 'Udemy',
    discountPercentage: 28,
    instructor: '신유니티',
    rating: 4.6,
    provider: 'Udemy',
  },
  {
    id: 9,
    title: 'Data Science 완전정복',
    author: '데이터사이언티스트',
    description:
      '데이터 과학의 기초부터 머신러닝까지 완벽하게 다루는 강의입니다.',
    reviewRating: 4.9,
    reviewCount: 2156,
    originalPrice: 150000,
    price: 108000,
    category: '데이터사이언스',
    platform: 'Udemy',
    discountPercentage: 28,
    isBestseller: true,
    instructor: '데이터사이언티스트',
    rating: 4.9,
    provider: 'Udemy',
  },
  {
    id: 10,
    title: 'Spring Boot 마스터클래스',
    author: '장스프링',
    description:
      'Spring Boot를 활용한 엔터프라이즈급 애플리케이션 개발을 배웁니다.',
    reviewRating: 4.7,
    reviewCount: 1124,
    originalPrice: 95000,
    price: 68000,
    category: '백엔드',
    platform: 'Udemy',
    discountPercentage: 28,
    isBestseller: true,
    instructor: '장스프링',
    rating: 4.7,
    provider: 'Udemy',
  },
  {
    id: 11,
    title: 'Flutter 모바일 앱 개발',
    author: '모플러터',
    description:
      'Flutter로 iOS와 Android 앱을 동시에 개발하는 크로스플랫폼 기술을 마스터합니다.',
    reviewRating: 4.5,
    reviewCount: 892,
    originalPrice: 85000,
    price: 61000,
    category: '모바일',
    platform: 'Udemy',
    discountPercentage: 28,
    instructor: '모플러터',
    rating: 4.5,
    provider: 'Udemy',
  },
  {
    id: 12,
    title: 'TypeScript 완벽 가이드',
    author: '타입스크립터',
    description:
      'TypeScript의 고급 타입 시스템부터 실전 프로젝트까지 완벽하게 다룹니다.',
    reviewRating: 4.8,
    reviewCount: 1567,
    originalPrice: 78000,
    price: 56000,
    category: 'JavaScript',
    platform: 'Udemy',
    discountPercentage: 28,
    isBestseller: true,
    instructor: '타입스크립터',
    rating: 4.8,
    provider: 'Udemy',
  },
]

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
