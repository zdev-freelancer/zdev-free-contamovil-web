import LoginForm from '../components/organisms/LoginForm'

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
          <div className="h-[64px] w-[64px] bg-primary rounded-full flex items-center justify-center" />
          
          {/* Wordmark: 24px bold */}
          <h1 className="text-[24px] font-bold text-foreground lowercase tracking-tight">
            contamóvil
          </h1>
        </div>

        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}