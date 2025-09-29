import { create } from 'zustand'

interface AuthLightState {
  ready: boolean
  loggedIn: boolean
  setReady: (v: boolean) => void
  setLoggedIn: (v: boolean) => void
}

export const useAuthLight = create<AuthLightState>()(() => ({
  ready: false,
  loggedIn: false,
  setReady: () => {},
  setLoggedIn: () => {},
}))

export function syncLoggedInFromToken(token: string | null) {
  useAuthLight.setState({ loggedIn: !!token })
}
