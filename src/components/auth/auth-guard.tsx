import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

export function AuthGuard() {
  const session = useAuthStore((state) => state.session)
  const location = useLocation()

  if (!session) {
    const attemptedPath = `${location.pathname}${location.search}${location.hash}`
    const redirect = encodeURIComponent(attemptedPath)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }

  return <Outlet />
}
