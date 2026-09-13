import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { userService } from '@/services/userService'
import type { AuthSession } from '@/types/user'

interface AuthState {
  session: AuthSession | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      login: (email, password) => {
        const user = userService.getByEmail(email)
        if (!user || user.password !== password) return false
        set({ session: { userId: user.id, name: user.name, email: user.email, role: user.role } })
        return true
      },
      logout: () => set({ session: null }),
    }),
    {
      name: 'auth_session',
      partialize: (state) => ({ session: state.session }),
    },
  ),
)
