import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AppProviders } from './providers/AppProviders'
import { useEffect } from 'react'
import { useAuthStore } from './stores/authStore'
import { useTheme } from '@/shared/hooks/use-theme'

const App = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)
  useTheme() // Initialize global theme class
  
  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}

export default App
