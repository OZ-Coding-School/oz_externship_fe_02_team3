const ACCOUNT = 'https://account.ozcoding.site'
const STUDY_GROUP = 'https://study.ozcoding.site'

// 로그인 페이지로 이동
export function goLogin() {
  const returnTo = encodeURIComponent(window.location.href)
  window.location.href = `${ACCOUNT}/auth/login?return_to=${returnTo}`
}

// 회원가입 페이지로 이동
export function goSignup() {
  window.location.href = `${ACCOUNT}/auth/signup`
}

// 스터디 그룹 페이지로 이동
export function goStudyGroup() {
  window.location.href = `${STUDY_GROUP}/study-group`
}
