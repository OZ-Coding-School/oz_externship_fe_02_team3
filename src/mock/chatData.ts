import type { Chat } from '@src/types/chat'

const chatData: Chat[] = [
  {
    id: 1,
    title: 'React 실무 프로젝트 스터디',
    date: '1월 15일',
    unreadCount: 2,
    lastMessage: {
      sender: '김스터디',
      content:
        '내일 미팅 시간 변경 가능하신가요?내일 미팅 시간 변경 가능하신가요?내일 미팅 시간 변경 가능하신가요?내일 미팅 시간 변경 가능하신가요?',
    },
    modifiedAt: '2024-01-15 14:30',
    participants: [
      { name: '김스터디', status: 'online' },
      { name: '박리액트', status: 'online' },
      { name: '이프론트', status: 'offline' },
      { name: '최자바', status: 'online' },
      { name: '김오즈', status: 'online' },
      { name: '이조교', status: 'online' },
      { name: '민매니저', status: 'online' },
      { name: '오코치', status: 'online' },
      { name: '양타입스크립트', status: 'online' },
    ],
    messages: [
      {
        id: 1,
        sender: '김스터디',
        message: '안녕하세요!',
        time: '오후 2:15',
        isOwn: false,
      },
      {
        id: 2,
        sender: '나',
        message: '네, 안녕하세요!',
        time: '오후 2:16',
        isOwn: true,
      },
      {
        id: 3,
        sender: '이프론트',
        message: '프로젝트 진행 상황 공유드립니다',
        time: '오후 2:20',
        isOwn: false,
      },
      {
        id: 4,
        sender: '김개발',
        message: '내일 미팅 시간 변경 가능하신가요?',
        time: '오후 2:30',
        isOwn: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Python 데이터 분석 스터디',
    date: '1월 15일',
    unreadCount: 1,
    lastMessage: {
      sender: '이데이터',
      content: '과제 제출했습니다!',
    },
    modifiedAt: '2024-01-15 13:45',
    participants: [
      { name: '이데이터', status: 'online' },
      { name: '박분석', status: 'online' },
      { name: '김파이썬', status: 'offline' },
    ],
    messages: [
      {
        id: 1,
        sender: '이데이터',
        message: '데이터 전처리 완료했습니다',
        time: '오후 1:30',
        isOwn: false,
      },
      {
        id: 2,
        sender: '나',
        message: '수고하셨습니다!',
        time: '오후 1:35',
        isOwn: true,
      },
      {
        id: 3,
        sender: '이데이터',
        message: '과제 제출했습니다!',
        time: '오후 1:45',
        isOwn: false,
      },
    ],
  },
  {
    id: 3,
    title: 'AWS 클라우드 아키텍처 스터디',
    date: '1월 15일',
    lastMessage: {
      sender: '박클라우드',
      content: '좋은 자료 감사합니다',
    },
    modifiedAt: '2024-01-15 10:20',
    participants: [
      { name: '박클라우드', status: 'online' },
      { name: '김서버리스', status: 'offline' },
      { name: '이도커', status: 'online' },
    ],
    messages: [
      {
        id: 1,
        sender: '박클라우드',
        message: 'Lambda 함수 설정 공유드려요',
        time: '오전 10:00',
        isOwn: false,
      },
      {
        id: 2,
        sender: '나',
        message: '감사합니다!',
        time: '오전 10:10',
        isOwn: true,
      },
      {
        id: 3,
        sender: '박클라우드',
        message: '좋은 자료 감사합니다',
        time: '오전 10:20',
        isOwn: false,
      },
    ],
  },
  {
    id: 4,
    title: 'Node.js 백엔드 개발팀',
    date: '1월 14일',
    lastMessage: {
      sender: '최서버',
      content: '다들 수고하셨습니다!',
    },
    modifiedAt: '2024-01-14 18:00',
    participants: [
      { name: '최서버', status: 'offline' },
      { name: '김노드', status: 'offline' },
      { name: '이익스프레스', status: 'offline' },
    ],
    messages: [
      {
        id: 1,
        sender: '최서버',
        message: 'API 개발 완료했습니다',
        time: '오후 5:30',
        isOwn: false,
      },
      {
        id: 2,
        sender: '나',
        message: '테스트 진행하겠습니다',
        time: '오후 5:45',
        isOwn: true,
      },
      {
        id: 3,
        sender: '최서버',
        message: '다들 수고하셨습니다!',
        time: '오후 6:00',
        isOwn: false,
      },
    ],
  },
]

export default chatData
