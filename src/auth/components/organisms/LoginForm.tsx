import { useState } from 'react'
import {
  Card,
  CardContent,
} from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'
import { Alert, AlertDescription } from '@/shared/ui/alert'
import { useLogin } from '@/auth/hooks/useLogin'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loginWithEmail, error, loading } = useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await loginWithEmail({ email, password })
  }

  return (
    <Card className="rounded-[20px] shadow-card border-border w-full">
      <CardContent className="p-[28px] space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-[16px]">
          <div className="space-y-[8px]">
            <Label htmlFor="email" className="text-[12px] font-semibold text-muted-foreground static text-left block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-[8px]">
            <Label htmlFor="password" className="text-[12px] font-semibold text-muted-foreground static text-left block">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </div>

          {/* Optional Forgot password link in 12px muted under button */}
          <div className="text-center mt-[12px]">
            <button
              type="button"
              className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => console.log('Implementar recuperación')}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}