import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AppProviders } from './providers/AppProviders'
import { useEffect, useState } from 'react'
import { useAuthStore } from './stores/authStore'
import { useTheme } from '@/shared/hooks/use-theme'
import { SplashScreen } from '@/shared/components/loaders/SplashScreen'

const App = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)
  const [showSplash, setShowSplash] = useState(true)
  useTheme() // Initialize global theme class
  
  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <AppProviders>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} duration={3000} />}
      <RouterProvider router={router} />
    </AppProviders>
  )
}

export default App