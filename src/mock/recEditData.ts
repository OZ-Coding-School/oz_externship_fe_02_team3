interface recMockData {
  title: string
  groupName: string
  capacityName: string
  deadline: Date
  content: string
  price: string
  tags: string[]
  files: { id: number; name: string; url: string }[]
}

export const recMockDatas: recMockData[] = [
  {
    title: 'React 실무 스터디 함께 하실 분 모집합니다!',
    groupName: '스터디 그룹2',
    capacityName: '5명',
    deadline: new Date(2025, 8, 30),
    content: `# 스터디 소개
실무 감각을 기르는 **React 프로젝트 스터디**입니다.

## 주요 활동
- 컴포넌트 설계 & 상태관리
- 코드 리뷰 & 리팩토링
- 배포 파이프라인 맛보기

## 일정
- 매주 화/목 19:00 ~ 21:00
- 온라인 중심, 월 2회 오프 모임

> 관심 있으시면 댓글/신청 부탁드려요!`,

    price: '10000',
    tags: ['React', 'TypeScript', '스터디'],
    files: [
      { id: 1, name: '스터디_계획서.pdf', url: '/mock/files/study-plan.pdf' },
    ],
  },
]
