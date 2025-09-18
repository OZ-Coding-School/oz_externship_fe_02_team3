import type { Post } from '@src/types/post'

export const post: Post = {
  id: 12345678901234567890n,
  uuid: '550e8400-e29b-41d4-a716-446655440000',
  author: {
    id: 9876543210987654321n,
    nickname: '박유니티',
  },
  title: 'Unity 게임 개발 프로젝트 팀원 모집',
  content: `# Unity 게임 개발 프로젝트 팀원 모집

Unity를 활용한 3D 게임 개발 프로젝트를 함께 진행할 팀원을 모집합니다.

## 프로젝트 소개
- **Unity 3D 게임 엔진**: 최신 Unity 2022.3 LTS 버전 활용
- **대표 플랫폼**: 게임 내 캐릭터 시스템 구현
- **3D 모델링**: Blender를 활용한 3D 모델 제작
- **게임 디자인**: 재미있고 몰입감 있는 게임플레이 기획

## 모집 대상
- C# 기초 지식이 있으신 분
- Unity 환경에 관심이 있으신 분
- 게임 제작 경험을 갖고 싶으신 분
- 팀워크를 중시하는 분

## 프로젝트 일정
- **기간**: 4개월 (2024년 12월 ~ 2025년 3월)
- **방식**: 온라인/오프라인 병행 (주 1회 오프라인)
- **미팅**: 주 3회, 화, 목, 토 오후 7시

![프로젝트 이미지](https://via.placeholder.com/600x300)  

## 개발 예정 게임
**3D 액션 어드벤처 게임**
- 플레이어는 미지의 행성을 탐험하며 퍼즐을 해결
- 몬스터와 적 지형 시스템
- 아이템 수집 및 캐릭터 성장 요소
- 멀티플레이어 협동 모드

## 사용 기술 스택
- **게임 엔진**: Unity 2022.3 LTS
- **프로그래밍**: C#
- **버전 관리**: Git, GitHub
- **3D 모델링**: Blender
- **UI/UX 디자인**: Figma

![게임 이미지](https://via.placeholder.com/600x300)  

## 예상 결과물
- 완성된 3D 게임 프로토타입
- Steam 플랫폼 배포 경험
- 게임 제작 포트폴리오 구축
- Unity 전문 개발자로 성장
`,
  attachments: [
    {
      file_name: '게임_기획서.pdf',
      file_url:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMTNfMTcg%2FMDAxNzAyNDczNjIzMzQ3.aZloZFhvYPgMlsDrwUGJ53Dj4_9u7EXFmY7dtMLnwBsg.MqutBq_-lnapCvYGdY90kDOyWwGOryGsHEIT_iYArcog.GIF.jsoie123%2FIMG_5959.GIF&type=sc960_832_gif',
    },
    {
      file_name: 'Unity_개발환경_설정가이드.docx',
      file_url:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMTNfMTcg%2FMDAxNzAyNDczNjIzMzQ3.aZloZFhvYPgMlsDrwUGJ53Dj4_9u7EXFmY7dtMLnwBsg.MqutBq_-lnapCvYGdY90kDOyWwGOryGsHEIT_iYArcog.GIF.jsoie123%2FIMG_5959.GIF&type=sc960_832_gif',
    },
  ],
  recruit_count: 10,
  cost: 50000,
  lectures: [
    {
      thumbnail_image_url: 'https://placehold.co/128x96?text=ex',
      name: 'React 기초',
      instructor: '박유니티',
      price: 120000,
      url: 'https://ozcodingschool.com/ozcoding/gamedevcamp',
    },
    {
      thumbnail_image_url: 'https://placehold.co/128x96?text=ex',
      name: 'C# 게임 프로그래밍',
      instructor: '김씨샵',
      price: 60000,
      url: 'https://ozcodingschool.com/ozcoding/gamedevcamp',
    },
  ],
  tags: [
    { name: 'Unity' },
    { name: 'C#' },
    { name: '게임개발' },
    { name: '3D게임' },
    { name: '인디게임' },
  ],
  deadline: '2025-09-30T23:59:59Z',
  created_at: '2025-09-18T12:00:00Z',
  view_count: 412,
  bookmark_count: 105,
}
