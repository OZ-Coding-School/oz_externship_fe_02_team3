import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { goLogin } from '../utils/redirect'
import { API_END_POINTS } from '@src/constants/apiendpoint'
import { api, getOrCreateRefresh, setAccessToken } from '@src/api/api'

export interface User {
  id: number
  nickname: string
  profile_img_url: string | null
  email: string
  phone_number: string
  birthday: string
}

export type RouteType = 'protected' | 'public'

interface AuthState {
  user: User | null
  bootstrapped: boolean
  loading: boolean

  isLoggedIn: () => boolean

  setUser: (u: User | null) => void
  bootstrap: (routeType: RouteType) => Promise<void>
  loginWithToken: (access: string) => Promise<void>
  tryFetchMe: () => Promise<User | null>
  logoutHard: () => Promise<void>
}

export const useAuth = create<AuthState>()(
  devtools(
    (set, get) => ({
      user: null,
      bootstrapped: false,
      loading: false,

      isLoggedIn: () => !!get().user,

      setUser: (u) => set({ user: u }, false, 'auth/setUser'),

      // /users/me 있으면 유저 로드(없으면 비로그인)
      tryFetchMe: async () => {
        try {
          const me = await api
            .get<User>(API_END_POINTS.ME)
            .then(({ data }) => data)
          return me
        } catch {
          set({ user: null }, false, 'info/:absent')
          return null
        }
      },

      /** 첫 진입 부트스트랩
       *  - Public: 유저 있으면 헤더 동기화, 없어도 그냥 통과
       *  - Protected: 유저 없으면 account 로그인 페이지로 바로 이동
       */
      bootstrap: async (routeType) => {
        if (get().bootstrapped) return
        set({ loading: true }, false, 'auth/bootstrap:start')

        try {
          // 1. 먼저 refresh token으로 access token 발급 시도
          await getOrCreateRefresh()

          // 2. access token이 있으면 사용자 정보 조회
          const me = await get().tryFetchMe()
          set(
            { user: me, bootstrapped: true, loading: false },
            false,
            'auth/bootstrap:done'
          )

          if (routeType === 'protected' && !me) {
            goLogin() // account 로그인으로 바로 이동
          }
        } catch {
          set(
            { user: null, bootstrapped: true, loading: false },
            false,
            'auth/bootstrap:fail'
          )
          if (routeType === 'protected') goLogin()
        }
      },

      // 외부 로그인에서 access를 받았을 때만 사용
      loginWithToken: async (access) => {
        set({ loading: true }, false, 'auth/login:start')
        try {
          setAccessToken(access)
          await get().tryFetchMe()
          set({ loading: false }, false, 'auth/login:success')
        } catch {
          setAccessToken(null)
          set({ user: null, loading: false }, false, 'auth/login:fail')
          goLogin()
        }
      },

      // 완전 로그아웃: 서버에서 refresh 쿠키 삭제 + 상태 초기화 + account 로그인 페이지로 이동
      logoutHard: async () => {
        set({ loading: true }, false, 'auth/logoutHard:start')
        try {
          await api.post(API_END_POINTS.LOGOUT)
        } catch (error) {
          alert(`Error: ${error}`)
        }
        setAccessToken(null)
        set({ user: null, loading: false }, false, 'auth/logoutHard:done')
        goLogin()
      },
    }),
    { name: 'auth-store' }
  )
)

// 인터셉터에서 쓸 helper
export async function logoutHard() {
  await useAuth.getState().logoutHard()
}
