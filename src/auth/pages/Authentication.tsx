import LoginForm from '../components/organisms/LoginForm'
import logoImage from '@/assets/ContaMovil.png?url'

export default function AuthenticationPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-background"
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(91, 78, 218, 0.06) 0%, transparent 70%)'
      }}
    >
      <div className="w-full max-w-[400px] p-4 flex flex-col items-center">
        {/* Top Logo Section - 16px gap below */}
        <div className="flex flex-col items-center gap-[16px] mb-[32px]">
          {/* Logo Mark: 64px */}
          <img 
          src={logoImage}
          alt="Contamóvil logo"
          className="h-[64px] w-[64px] object-contain"
          />
          
          {/* Wordmark: 24px bold */}
          <h1 className="text-[36px] font-bold text-foreground lowercase tracking-tight">
            ContaMóvil
          </h1>
        </div>

        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}