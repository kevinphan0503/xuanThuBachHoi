import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'

const PageTracker = () => {
  const location = useLocation()

  useEffect(() => {
    // Track page visits (don't track admin pages)
    if (!location.pathname.startsWith('/admin')) {
      fetch(`${API_BASE_URL}/api/page-visit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: location.pathname,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error('Error tracking page visit:', err))
    }
  }, [location])

  return null
}

export default PageTracker
