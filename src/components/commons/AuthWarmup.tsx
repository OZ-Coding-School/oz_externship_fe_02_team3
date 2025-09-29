import { useEffect, useRef } from 'react'
import { getAccessToken, refreshAccessToken } from '@src/api/api'
import { useAuthLight, syncLoggedInFromToken } from '@src/store/authLight'

export default function AuthWarmup({
  children,
}: {
  children: React.ReactNode
}) {
  const ranRef = useRef(false)

  useEffect(() => {
    if (ranRef.current) return
    ranRef.current = true
    ;(async () => {
      try {
        const token = getAccessToken() ?? (await refreshAccessToken()) // access 없으면 refresh로 발급
        syncLoggedInFromToken(token)
      } finally {
        useAuthLight.setState({ ready: true })
      }
    })()
  }, [])

  return <div>{children}</div>
}
