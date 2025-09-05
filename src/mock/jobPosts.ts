export interface JobPost {
  id: number
  title: string
  viewCount: number
  commentCount: number
  memberLimit: number
  deadline: string
  courses: string[]
  tags: string[]
  image: string
}

// 스터디 공고 더미데이터
export const jobPosts: JobPost[] = [
  {
    id: 1,
    title: 'Unity 게임 개발 프로젝트 팀원 모집',
    viewCount: 412,
    commentCount: 105,
    memberLimit: 20,
    deadline: '2025. 12. 30.',
    courses: [
      'Unity 게임 개발 마스터클래스 - 박유니티',
      'C# 게임 프로그래밍 - 김씨샵',
    ],
    tags: ['Unity', 'C#', '게임개발', '3D게임'],
    image: 'https://placehold.co/128x96',
  },
  {
    id: 2,
    title: '블록체인 & Web3 개발자 양성 스터디',
    viewCount: 278,
    commentCount: 73,
    memberLimit: 15,
    deadline: '2025. 12. 30.',
    courses: [
      '블록체인 전문가 과정 - 블록체인맨',
      'Solidity 스마트 컨트랙트 - 이솔리디티',
    ],
    tags: ['블록체인', 'Web3', 'Solidity', '암호화폐'],
    image: 'https://placehold.co/128x96',
  },
  {
    id: 3,
    title: 'Spring Boot 백엔드 마스터 스터디',
    viewCount: 324,
    commentCount: 89,
    memberLimit: 18,
    deadline: '2025. 12. 30.',
    courses: [
      'Spring Boot 핵심 마스터 - 김스프링',
      'JPA & Hibernate 실습 - 박데이터',
    ],
    tags: ['Spring', 'Java', '백엔드', '데이터베이스'],
    image: 'https://placehold.co/128x96',
  },
  {
    id: 4,
    title: 'DevOps & AWS 클라우드 실무 스터디',
    viewCount: 167,
    commentCount: 28,
    memberLimit: 12,
    deadline: '2025. 10. 3.',
    courses: [
      'AWS 클라우드 이커넥터 - 한클라우드',
      'Docker & Kubernetes - 이컨테이너',
    ],
    tags: ['DevOps', 'AWS', '인프라', '클라우드'],
    image: 'https://placehold.co/128x96',
  },
  {
    id: 5,
    title: 'React Native 모바일 앱 개발 스터디',
    viewCount: 198,
    commentCount: 35,
    memberLimit: 10,
    deadline: '2024. 4. 30.',
    courses: [
      'React Native 앱 개발 가이드 - 김모바일',
      'React 기초 - 박리액트',
    ],
    tags: ['React Native', '모바일', '앱개발'],
    image: 'https://placehold.co/128x96',
  },
  {
    id: 6,
    title: '딥러닝 AI 프로젝트 스터디원 모집',
    viewCount: 289,
    commentCount: 52,
    memberLimit: 14,
    deadline: '2024. 5. 12.',
    courses: ['딥러닝 블록 마스터 - 김딥러닝', 'TensorFlow 실전 - 박텐서플로'],
    tags: ['딥러닝', 'AI', '머신러닝'],
    image: 'https://placehold.co/128x96',
  },
  {
    id: 7,
    title: '알고리즘 코딩테스트 대비 스터디',
    viewCount: 312,
    commentCount: 67,
    memberLimit: 20,
    deadline: '2024. 5. 20.',
    courses: ['알고리즘 문제풀이 정석 - 최알고', '자료구조 필수 - 박자료'],
    tags: ['자료구조', '알고리즘', '코딩테스트'],
    image: 'https://placehold.co/128x96',
  },
  {
    id: 8,
    title: 'Vue.js 프론트엔드 개발팀 募集',
    viewCount: 245,
    commentCount: 38,
    memberLimit: 8,
    deadline: '2024. 4. 15.',
    courses: ['Vue.js 완벽 가이드 - 정뷰', 'Nuxt.js 심화 - 김넉스트'],
    tags: ['Vue.js', '프론트엔드', '웹개발'],
    image: 'https://placehold.co/128x96',
  },
  {
    id: 9,
    title: 'Node.js 백엔드 개발 스터디원 구합니다',
    viewCount: 178,
    commentCount: 29,
    memberLimit: 12,
    deadline: '2024. 4. 25.',
    courses: ['Node.js 마스터 - 박서버'],
    tags: ['Node.js', '백엔드', '모던웹'],
    image: 'https://placehold.co/128x96',
  },
  {
    id: 10,
    title: 'Flutter 모바일 앱 개발팀 모집',
    viewCount: 156,
    commentCount: 24,
    memberLimit: 10,
    deadline: '2024. 4. 29.',
    courses: ['Flutter 완주가이드 - 이모바일'],
    tags: ['Flutter', '모바일', '크로스플랫폼'],
    image: 'https://placehold.co/128x96',
  },
]

// 맞춤 스터디 공고 더미데이터
export const RecruitmentJobPosts: JobPost[] = [
  {
    id: 1,
    title: 'React 실무 프로젝트',
    viewCount: 156,
    commentCount: 23,
    memberLimit: 5,
    deadline: '2024-02-28',
    courses: ['React 완벽 마스터 - 김개발', 'Next.js 실전 - 박프론트'],
    tags: ['React', '프로젝트실습', '초보자환영'],
    image: 'https://placehold.co/128x96?text=React',
  },
  {
    id: 2,
    title: 'Python 데이터 분석 스터디',
    viewCount: 89,
    commentCount: 17,
    memberLimit: 10,
    deadline: '2024-03-05',
    courses: ['Python 데이터 사이언스 - 이데이터'],
    tags: ['Python', '데이터사이언스', '주말스터디'],
    image: 'https://placehold.co/128x96?text=Python',
  },
  {
    id: 3,
    title: 'AWS 클라우드 아키텍처',
    viewCount: 134,
    commentCount: 31,
    memberLimit: 8,
    deadline: '2024-03-10',
    courses: ['AWS 클라우드 아키텍처 - 한클라우드'],
    tags: ['AWS', '클라우드', '실무중심'],
    image: 'https://placehold.co/128x96?text=AWS',
  },
]
