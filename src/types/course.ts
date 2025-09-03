export interface Course {
  id: number
  provider: 'Udemy' | 'Inflearn' | 'Fastcampus' | string
  title: string
  instructor: string
  description: string
  rating: number
  reviewCount: number
  price: number
  originalPrice?: number
  thumbnailUrl?: string
  category: string
  tags?: string[]
}

export interface CoursesQuery {
  q?: string
  category?: string
  sort?: 'popular' | 'latest' | 'rating' | 'priceAsc' | 'priceDesc'
  page?: number
  pageSize?: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
