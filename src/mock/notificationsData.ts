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
    type: 'APPLICATION_ACCEPT',
    is_read: false,
    back_url_link: '/applications/uuid-2',
    created_at: '2025-09-11T09:30:00Z',
  },
  {
    notification_id: 3,
    content:
      'React 실무 프로젝트 스터디에 김민지님이 참여했습니다. 환영해주세요!',
    type: 'STUDY_JOIN',
    is_read: true,
    back_url_link: '?study_group_uuid=a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    created_at: '2025-09-10T08:45:00Z',
  },
  {
    notification_id: 4,
    content:
      'Vue.js 프론트엔드 개발팀 모집 구인 공고에 대한 지원내역이 거절되었습니다.',
    type: 'APPLICATION_REJECT',
    is_read: true,
    back_url_link: '/applications/uuid-4',
    created_at: '2024-11-30T16:20:00Z',
  },
  {
    notification_id: 5,
    content:
      '오늘은 Python 데이터 분석 스터디의 종료일이에요! 스터디 후기를 기록해주세요!',
    type: 'STUDY_REVIEW_REQUEST',
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
  {
    notification_id: 7,
    content:
      '김정호님이 Python 기초 스터디에 스터디 기록을 작성하셨습니다. 확인해보세요!',
    type: 'STUDY_NOTE_CREATE',
    is_read: false,
    back_url_link: '/studies/uuid-7/records/record-1',
    created_at: '2025-09-14T18:45:00Z',
  },
  {
    notification_id: 8,
    content:
      '금일 오전 09시 30분부터 오후 13시 30분까지 Python 기초 스터디에서 자료형 학습이 예정되어 있습니다! 잊지말고 참여해주세요!',
    type: 'TODAY_SCHEDULE',
    is_read: false,
    back_url_link: '/study-group/123456',
    created_at: '2025-09-15T00:01:00Z',
  },
  {
    notification_id: 9,
    content:
      '내일은 Python 기초 스터디에서 자료형 학습이 예정되어 있습니다! 잊지말고 참여해주세요!',
    type: 'UPCOMING_SCHEDULE',
    is_read: false,
    back_url_link: '/study-group/123',
    created_at: '2025-09-14T00:01:00Z',
  },
  {
    notification_id: 10,
    content:
      '이서영님이 React 심화 스터디에 스터디 기록을 작성하셨습니다. 확인해보세요!',
    type: 'STUDY_NOTE_CREATE',
    is_read: true,
    back_url_link: '/study-group/123zw',
    created_at: '2025-09-13T16:20:00Z',
  },
  {
    notification_id: 11,
    content:
      '내일은 React 심화 스터디에서 상태 관리 학습이 예정되어 있습니다! 잊지말고 참여해주세요!',
    type: 'UPCOMING_SCHEDULE',
    is_read: true,
    back_url_link: '/study-group/123zw33',
    created_at: '2025-09-13T00:01:00Z',
  },
  {
    notification_id: 12,
    content: 'JavaScript 스터디에 박지훈님이 참여했습니다. 환영해주세요!',
    type: 'STUDY_JOIN',
    is_read: false,
    back_url_link: '?study_group_uuid=b2c3d4e5-f6a7-8901-bcde-f23456789012',
    created_at: '2025-09-15T11:30:00Z',
  },
]

export default notificationsData
