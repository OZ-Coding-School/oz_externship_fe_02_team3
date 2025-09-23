import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

export const API_BASE_URL = 'https://ozcoding.site'

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// 액세스 토큰: 메모리에만 보관
let accessToken: string | null = null
export const setAccessToken = (token: string | null) => {
  accessToken = token
}

// 요청마다 Authorization 부착
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

/* Shared Promise refresh
 *  - 만약에 한 페이지에서 여러 401 요청이 오는 경우에 모든 요청에 대한 refresh을 처리하지 않음.
 *  - 첫 번째 401에 대한 요청에만 날리고, 다른 401 요청에 대해서는 같은 Promise를 await으로 기다림.
 *  - token이 발급되면 그 내용으로 다시 api 요청하는 방식
 */
let refreshPromise: Promise<string | null> | null = null

// 리프래시토큰 재발급 함수
async function doRefresh(): Promise<string | null> {
  try {
    const res = await axios.post<{ access: string }>(
      `${API_BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    )
    const token = res.data?.access ?? null
    setAccessToken(token)
    return token
  } catch {
    setAccessToken(null)
    return null
  }
}

// refreshPromise를 생성/재사용/해체하는 역할을 하는 함수
async function getOrCreateRefresh(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = doRefresh().finally(() => {
      refreshPromise = null // 끝나면 초기화를 하여 다음 401 요청에 대하여 새로운 Promise를 생성시킴.
    })
  }
  return refreshPromise
}

// 401 공통 처리
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalAPICall = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined
    const status = error.response?.status

    if (status === 401 && originalAPICall && !originalAPICall._retry) {
      originalAPICall._retry = true

      const token = await getOrCreateRefresh()

      if (token) {
        // If 토큰이 발급이 되면, 원래 진행하려던 API 요청 시작.
        originalAPICall.headers = originalAPICall.headers ?? {}
        originalAPICall.headers.Authorization = `Bearer ${token}`
        return api(originalAPICall)
      } else {
        // If refresh token 사용 실패: 완전 로그아웃(쿠키 제거 + 상태 초기화 + 로그인 이동)
        const { logoutHard } = await import('../store/auth')
        await logoutHard()
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)
