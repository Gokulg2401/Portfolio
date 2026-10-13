import { useEffect, useState } from 'react'

export function useProfile() {
  const [state, setState] = useState({ profile: null, error: null, loading: true })

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/profile', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        return res.json()
      })
      .then((profile) => setState({ profile, error: null, loading: false }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ profile: null, error, loading: false })
      })
    return () => controller.abort()
  }, [])

  return state
}
