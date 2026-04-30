import { supabase } from '@/shared/lib/supabaseClient'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string
  tenantId: string
  role: 'admin' | 'vendedor'
  fullName: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export class AuthService {

  async loginWithEmail(credentials: LoginCredentials): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) throw new Error(this.mapErrorMessage(error.message))
    if (!data.user) throw new Error('No se pudo obtener datos del usuario')

    return this.fetchAuthUser(data.user.id, data.user.email || '')
  }

  async loginWithGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) throw new Error(this.mapErrorMessage(error.message))
  }

  async getCurrentSession(): Promise<AuthUser | null> {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Error getting session:', error)
      return null
    }

    if (!session?.user) return null

    return this.fetchAuthUser(session.user.id, session.user.email || '')
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error('Error al cerrar sesión')
  }

  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        if (!session?.user) {
          callback(null)
          return
        }
        try {
          const user = await this.fetchAuthUser(session.user.id, session.user.email || '')
          callback(user)
        } catch {
          callback(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }

  // Obtiene tenant_id y role desde la tabla profiles
  private async fetchAuthUser(userId: string, email: string): Promise<AuthUser> {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('tenant_id, role, full_name')
      .eq('user_id', userId)
      .single()

    if (error || !profile) {
      throw new Error('No se encontró perfil para este usuario. Contacta al administrador.')
    }

    return {
      id: userId,
      email,
      tenantId: profile.tenant_id,
      role: profile.role,
      fullName: profile.full_name,
    }
  }

  private mapErrorMessage(errorMessage: string): string {
    const errorMap: Record<string, string> = {
      'Invalid login credentials': 'Email o contraseña incorrectos',
      'Email not confirmed': 'Por favor confirma tu email',
      'User not found': 'Usuario no encontrado',
      'Email rate limit exceeded': 'Demasiados intentos, intenta más tarde',
    }
    return errorMap[errorMessage] || 'Error al iniciar sesión. Intenta nuevamente.'
  }
}

export const authService = new AuthService()