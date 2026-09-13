import { Navigate, Outlet, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

/** Keeps an already-logged-in user off /login and /register (ROUTING.md). */
export function GuestGuard() {
  const session = useAuthStore((state) => state.session)
  const [searchParams] = useSearchParams()

  if (session) {
    return <Navigate to={searchParams.get('redirect') ?? '/'} replace />
  }

  return <Outlet />
}
