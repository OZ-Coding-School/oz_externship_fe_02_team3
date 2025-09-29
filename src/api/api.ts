import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

export const API_BASE_URL = 'https://api.ozcoding.site'

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 서브도메인 refresh 쿠키 사용
})

// ── Access Token: 메모리 보관 ─────────────────────────────
let access: string | null = null
export const getAccessToken = () => access
export const setAccessToken = (token: string | null) => {
  access = token
}

api.interceptors.request.use((config) => {
  if (access) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${access}`
  }
  return config
})

let refreshPromise: Promise<string | null> | null = null

async function doRefresh(): Promise<string | null> {
  try {
    const res = await axios.post<{ access: string }>(
      `${API_BASE_URL}/api/v1/auth/refresh`,
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

export async function getOrCreateRefresh(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = doRefresh().finally(() => {
      refreshPromise = null
    })
  }
  return refreshPromise
}

export async function refreshAccessToken(): Promise<string | null> {
  if (getAccessToken()) return getAccessToken()
  return await getOrCreateRefresh()
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined
    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true
      const token = await getOrCreateRefresh()
      if (token) {
        original.headers = original.headers ?? {}
        original.headers.Authorization = `Bearer ${token}`
        return api(original)
      }
    }
    return Promise.reject(error)
  }
)
