import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const API_BASE_URL = 'https://api.ozcoding.site'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

const getAuthToken = () => {
  const token = localStorage.getItem('access_token')
  if (!import.meta.env.DEV) {
    return token
  }
  return token || 'dev-token'
}

export function useCurrentUser() {
  const query = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const token = getAuthToken()
      const response = await api.get('/api/v1/info/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    },
  })

  return {
    ...query,
    currentUser: query.data,
  }
}
