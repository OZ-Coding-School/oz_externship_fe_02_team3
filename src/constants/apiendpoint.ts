export const API_END_POINTS = {
  // 유저 상태관리용 상수
  ME: 'api/v1/info/',
  REFRESH: 'api/v1/auth/refresh',
  LOGOUT: 'api/v1/auth/logout',

  // 구인공고 관련 상수
  RECRUITMENTS_LIST: '/recruitments', // 구인 공고 목록 조회
  RECRUITMENTS_LIST_ME: '/recruitments/me', // 내가 등록한 스터디 구인 공고 목록 조회
  RECRUITMENTS_CREATE: '/recruitments/create', // 구인 공고 생성
  RECRUITMENTS_EDIT: (recruitment_uuid?: string) =>
    `/recruitments/${recruitment_uuid}`, // 구인 공고 수정
  RECRUITMENTS_DETAIL: (uuid: string) => `/recruitments/${uuid}`, // 구인공고 상세페이지
} as const
