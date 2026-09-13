import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { toast } from '@/stores/toastStore'

export function AdminGuard() {
  const session = useAuthStore((state) => state.session)
  const isAdmin = session?.role === 'admin'

  useEffect(() => {
    if (!isAdmin) toast.error('Access denied')
  }, [isAdmin])

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
