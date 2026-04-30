// @/app/stores/authStore.ts
import { authService, type AuthUser } from '@/auth/infrastructure/authService'
import { create } from 'zustand'

interface AuthState {
  user: AuthUser | null
  loading: boolean
  initialized: boolean

  tenantId: () => string | null
  setUser: (user: AuthUser | null) => void
  logout: () => Promise<void>
  initializeAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  initialized: false,

  tenantId: () => get().user?.tenantId ?? null,

  setUser: (user) => set({ user }),

  logout: async () => {
    try {
      await authService.signOut()
      set({ user: null })
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  },

  initializeAuth: async () => {
    if (get().initialized) return

    try {
      const user = await authService.getCurrentSession()
      set({
        user,
        loading: false,
        initialized: true,
      })

      authService.onAuthStateChange((user) => {
        set({ user })
      })

    } catch (error) {
      console.error('Auth initialization error:', error)
      set({
        loading: false,
        initialized: true,
        user: null,
      })
    }
  },
}))