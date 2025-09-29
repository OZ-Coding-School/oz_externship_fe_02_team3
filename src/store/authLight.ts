import { create } from 'zustand'

interface AuthLightState {
  ready: boolean
  loggedIn: boolean
  setReady: (v: boolean) => void
  setLogged: (v: boolean) => void
}

export const useAuthLight = create<AuthLightState>((set) => ({
  ready: false,
  loggedIn: false,
  setReady: (v) => set({ ready: v }),
  setLogged: (v) => set({ loggedIn: v }),
}))

export const syncLoggedInFromToken = (token?: string | null) => {
  useAuthLight.setState({ loggedIn: !!token })
}
