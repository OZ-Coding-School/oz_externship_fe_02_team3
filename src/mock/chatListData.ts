import type { Chat, MessagesResponse } from '@src/types/chat'

export const chatList: Chat[] = [
  {
    uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'React 실무 프로젝트 스터디',
    last_message: {
      sender_nickname: '김스터디',
      content: `내일 미팅 시간 변경 가능하신가요? 내일 미팅 시간 변경 가능하신가요? 내일 미팅 시간 변경 가능하신가요? 내일 미팅 시간 변경 가능하신가요?`,
      created_at: '2025-09-24T04:30:00Z',
    },
    unread_count: 2,
  },
  {
    uuid: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    name: 'Python 데이터 분석 스터디',
    last_message: {
      sender_nickname: '이데이터',
      content: '과제 제출했습니다!',
      created_at: '2025-09-23T13:45:00Z',
    },
    unread_count: 1,
  },
  {
    uuid: 'c3d4e5f6-a7b8-9012-cdef-345678901234',
    name: 'AWS 클라우드 아키텍처 스터디',
    last_message: {
      sender_nickname: '박클라우드',
      content: '좋은 자료 감사합니다',
      created_at: '2025-09-24T05:50:00Z',
    },
    unread_count: 0,
  },
  {
    uuid: 'd4e5f6a7-b8c9-0123-defa-456789012345',
    name: 'Node.js 백엔드 개발팀',
    last_message: {
      sender_nickname: '최서버',
      content: '다들 수고하셨습니다!',
      created_at: '2025-09-24T06:10:00Z',
    },
    unread_count: 0,
  },
  {
    uuid: 'e5f6a7b8-c9d0-1234-efab-567890123456',
    name: '알고리즘 스터디',
    last_message: null,
    unread_count: 0,
  },
]

// Record<string, MessagesResponse> : 문자열을 키로 하고, MessagesResponse를 값으로 하는 객체
export const chatMessagesData: Record<string, MessagesResponse> = {
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890': {
    next_cursor: 'c_msg_react_001',
    results: [
      {
        message_id: 4,
        sender: {
          user_uuid: 'u3d4e5f6-a7b8-9012-cdef-345678901234',
          nickname: '김개발',
          profile_img_url: '~/profiles/kim-dev.png',
        },
        content: '내일 미팅 시간 변경 가능하신가요?',
        created_at: '2024-01-15T14:30:00Z',
      },
      {
        message_id: 3,
        sender: {
          user_uuid: 'u2c3d4e5-f6a7-8901-bcde-f23456789012',
          nickname: '이프론트',
          profile_img_url: '~/profiles/lee-front.png',
        },
        content: '프로젝트 진행 상황 공유드립니다',
        created_at: '2024-01-15T14:20:00Z',
      },
      {
        message_id: 2,
        sender: {
          user_uuid: 'current-user-uuid',
          nickname: '나',
          profile_img_url: '~/profiles/me.png',
        },
        content: '네, 안녕하세요!',
        created_at: '2024-01-15T14:16:00Z',
      },
      {
        message_id: 1,
        sender: {
          user_uuid: 'u1b2c3d4-e5f6-7890-abcd-ef1234567890',
          nickname: '김스터디',
          profile_img_url: '~/profiles/kim-study.png',
        },
        content: '안녕하세요!',
        created_at: '2024-01-15T14:15:00Z',
      },
    ],
  },
  'b2c3d4e5-f6a7-8901-bcde-f23456789012': {
    next_cursor: null,
    results: [
      {
        message_id: 3,
        sender: {
          user_uuid: 'u4e5f6a7-b8c9-0123-defa-456789012345',
          nickname: '이데이터',
          profile_img_url: '~/profiles/lee-data.png',
        },
        content: '과제 제출했습니다!',
        created_at: '2024-01-15T13:45:00Z',
      },
      {
        message_id: 2,
        sender: {
          user_uuid: 'current-user-uuid',
          nickname: '나',
          profile_img_url: '~/profiles/me.png',
        },
        content: '수고하셨습니다!',
        created_at: '2024-01-15T13:35:00Z',
      },
      {
        message_id: 1,
        sender: {
          user_uuid: 'u4e5f6a7-b8c9-0123-defa-456789012345',
          nickname: '이데이터',
          profile_img_url: '~/profiles/lee-data.png',
        },
        content: '데이터 전처리 완료했습니다',
        created_at: '2024-01-15T13:30:00Z',
      },
    ],
  },
  'c3d4e5f6-a7b8-9012-cdef-345678901234': {
    next_cursor: null,
    results: [
      {
        message_id: 3,
        sender: {
          user_uuid: 'u5f6a7b8-c9d0-1234-efab-567890123456',
          nickname: '박클라우드',
          profile_img_url: '~/profiles/park-cloud.png',
        },
        content: '좋은 자료 감사합니다',
        created_at: '2024-01-15T10:20:00Z',
      },
      {
        message_id: 2,
        sender: {
          user_uuid: 'current-user-uuid',
          nickname: '나',
          profile_img_url: '~/profiles/me.png',
        },
        content: '감사합니다!',
        created_at: '2024-01-15T10:10:00Z',
      },
      {
        message_id: 1,
        sender: {
          user_uuid: 'u5f6a7b8-c9d0-1234-efab-567890123456',
          nickname: '박클라우드',
          profile_img_url: '~/profiles/park-cloud.png',
        },
        content: 'Lambda 함수 설정 공유드려요',
        created_at: '2024-01-15T10:00:00Z',
      },
    ],
  },
  'd4e5f6a7-b8c9-0123-defa-456789012345': {
    next_cursor: null,
    results: [
      {
        message_id: 3,
        sender: {
          user_uuid: 'u6a7b8c9-d0e1-2345-fabc-678901234567',
          nickname: '최서버',
          profile_img_url: '~/profiles/choi-server.png',
        },
        content: '다들 수고하셨습니다!',
        created_at: '2024-01-14T18:00:00Z',
      },
      {
        message_id: 2,
        sender: {
          user_uuid: 'current-user-uuid',
          nickname: '나',
          profile_img_url: '~/profiles/me.png',
        },
        content: '테스트 진행하겠습니다',
        created_at: '2024-01-14T17:45:00Z',
      },
      {
        message_id: 1,
        sender: {
          user_uuid: 'u6a7b8c9-d0e1-2345-fabc-678901234567',
          nickname: '최서버',
          profile_img_url: '~/profiles/choi-server.png',
        },
        content: 'API 개발 완료했습니다',
        created_at: '2024-01-14T17:30:00Z',
      },
    ],
  },
  'e5f6a7b8-c9d0-1234-efab-567890123456': {
    next_cursor: null,
    results: [], // 메시지가 없는 채팅방
  },
}

export default chatMessagesData
