import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    const scrollState = state as { scrollTo?: string } | null
    if (scrollState?.scrollTo) return
    window.scrollTo(0, 0)
  }, [pathname, state])

  return null
}