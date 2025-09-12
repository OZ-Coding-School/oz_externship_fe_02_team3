// src/mocks/notificationsData.ts
import type { NotificationItem } from '@src/types/notification'

const notificationsData: NotificationItem[] = [
  {
    notification_id: 1,
    content:
      'Unity 게임 개발 프로젝트 팀원 모집 구인 공고에 대한 1건의 대기중인 지원자가 있습니다.Unity 게임 개발 프로젝트 팀원 모집 구인 공고에 대한 1건의 대기중인 지원자가 있습니다. Unity 게임 개발 프로젝트 팀원 모집 구인 공고에 대한 1건의 대기중인 지원자가 있습니다.',
    type: 'ADD_APPLICATION',
    is_read: false,
    back_url_link: '/recruitment/manage',
    created_at: '2025-09-11T06:00:00Z',
  },
  {
    notification_id: 2,
    content:
      'React 실무 프로젝트 함께하실 분 모집합니다! 구인 공고에 대한 지원내역이 승인되었습니다.',
    type: 'APPROVE_APPLICATION',
    is_read: false,
    back_url_link: '/applications/uuid-2',
    created_at: '2025-09-11T09:30:00Z',
  },
  {
    notification_id: 3,
    content:
      'React 실무 프로젝트 스터디에 김민지님이 참여했습니다. 환영해주세요!',
    type: 'NEW_MEMBER_JOIN',
    is_read: true,
    back_url_link: '/studies/uuid-3',
    created_at: '2025-09-10T08:45:00Z',
  },
  {
    notification_id: 4,
    content:
      'Vue.js 프론트엔드 개발팀 모집 구인 공고에 대한 지원내역이 거절되었습니다.',
    type: 'REJECT_APPLICATION',
    is_read: true,
    back_url_link: '/applications/uuid-4',
    created_at: '2024-11-30T16:20:00Z',
  },
  {
    notification_id: 5,
    content:
      '오늘은 Python 데이터 분석 스터디의 종료일이에요! 스터디 후기를 기록해주세요!',
    type: 'STUDY_END',
    is_read: false,
    back_url_link: '/studies/uuid-5/review',
    created_at: '2024-11-29T14:15:00Z',
  },
  {
    notification_id: 6,
    content:
      'React 실무 프로젝트 함께하실 분 모집합니다! 구인 공고에 대한 2건의 대기중인 지원자가 있습니다.',
    type: 'ADD_APPLICATION',
    is_read: true,
    back_url_link: '/recruitment/manage',
    created_at: '2024-11-29T11:30:00Z',
  },
]

export default notificationsData
