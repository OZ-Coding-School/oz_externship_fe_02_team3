export interface CourseCardData {
  id: number
  name: string
  instructor: string
  price: number
  url: string
}

export const postDetailCourseData: CourseCardData[] = [
  {
    id: 1,
    name: 'Unity 게임 개발 마스터클래스',
    instructor: '박유니티',
    price: 120000,
    url: 'ozcodingschool.com/ozcoding/gamedevcamp',
  },
  {
    id: 2,
    name: 'C# 게임 프로그래밍',
    instructor: '김씨샵',
    price: 60000,
    url: 'ozcodingschool.com/ozcoding/aileadercamp',
  },
]
