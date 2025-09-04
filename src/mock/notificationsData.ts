import type { NotificationItem } from '@src/types/notification'

const notificationsData: NotificationItem[] = [
  {
    id: 1,
    type: 'application',
    title: '지원자 대기',
    message:
      'Unity 게임 개발 프로젝트 팀원 모집 구인 공고에 대한 1건의 대기중인 지원자가 있습니다.Unity 게임 개발 프로젝트 팀원 모집 구인 공고에 대한 1건의 대기중인 지원자가 있습니다. Unity 게임 개발 프로젝트 팀원 모집 구인 공고에 대한 1건의 대기중인 지원자가 있습니다.',
    date: '12월 1일',
    isRead: false,
    isUnread: true,
  },
  {
    id: 2,
    type: 'approval',
    title: '지원 승인',
    message:
      'React 실무 프로젝트 함께하실 분 모집합니다! 구인 공고에 대한 지원내역이 승인되었습니다.',
    date: '12월 1일',
    isRead: false,
    isUnread: true,
  },
  {
    id: 3,
    type: 'join',
    title: '새 멤버 참여',
    message:
      'React 실무 프로젝트 스터디에 김민지님이 참여했습니다. 환영해주세요!',
    date: '12월 1일',
    isRead: true,
    isUnread: false,
  },
  {
    id: 4,
    type: 'rejection',
    title: '지원 거절',
    message:
      'Vue.js 프론트엔드 개발팀 모집 구인 공고에 대한 지원내역이 거절되었습니다.',
    date: '11월 30일',
    isRead: true,
    isUnread: false,
  },
  {
    id: 5,
    type: 'study_end',
    title: '스터디 종료',
    message:
      '오늘은 Python 데이터 분석 스터디의 종료일이에요! 스터디 후기를 기록해주세요!',
    date: '11월 29일',
    isRead: false,
    isUnread: true,
  },
  {
    id: 6,
    type: 'application',
    title: '지원자 대기',
    message:
      'React 실무 프로젝트 함께하실 분 모집합니다! 구인 공고에 대한 2건의 대기중인 지원자가 있습니다.',
    date: '11월 29일',
    isRead: true,
    isUnread: false,
  },
]

export default notificationsData
