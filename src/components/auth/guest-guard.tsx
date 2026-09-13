import { Navigate, Outlet, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

/** True only for a same-app relative path — rejects protocol-relative ("//host") or absolute URLs. */
function isSafeRedirectTarget(target: string): boolean {
  return target.startsWith('/') && !target.startsWith('//') && !target.startsWith('/\\')
}

/** Keeps an already-logged-in user off /login and /register (ROUTING.md). */
export function GuestGuard() {
  const session = useAuthStore((state) => state.session)
  const [searchParams] = useSearchParams()

  if (session) {
    const redirect = searchParams.get('redirect')
    const target = redirect && isSafeRedirectTarget(redirect) ? redirect : '/'
    return <Navigate to={target} replace />
  }

  return <Outlet />
}
