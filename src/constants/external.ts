export const EXTERNAL = {
  ACCOUNT_ROOT: 'https://account.ozcoding.site', // 아이콘 & 로그아웃
  STUDY_GROUP: 'https://study.ozcoding.site/study-group', // 스터디 그룹
  MY_PAGE: 'https://account.ozcoding.site/my-page', // 마이페이지
  LOGIN: 'https://account.ozcoding.site/auth/login', // 로그인
  SIGNUP: 'https://account.ozcoding.site/auth/signup', // 회원가입
} as const

export const withReturnTo = (baseUrl: string) => {
  const returnTo = encodeURIComponent(window.location.href)
  const hasQuery = baseUrl.includes('?')
  return `${baseUrl}${hasQuery ? '&' : '?'}return_to=${returnTo}`
}

export const go = (url: string) => {
  window.location.href = url
}
