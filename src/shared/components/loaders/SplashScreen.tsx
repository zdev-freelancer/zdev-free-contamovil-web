import { useEffect, useState } from 'react'
import logoImage from '@/assets/ContaMovil.png?url'
import './splash-screen.css'

interface SplashScreenProps {
  onComplete?: () => void
  duration?: number
}

export const SplashScreen = ({ onComplete, duration = 3000 }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  if (!isVisible) return null

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo-container">
          <img 
            src={logoImage}
            alt="Contamóvil"
            className="splash-logo"
          />
        </div>
        
        <h1 className="splash-title">ContaMóvil</h1>
        
        <div className="splash-loader">
          <div className="splash-progress-bar" />
        </div>
        
        <p className="splash-subtitle">Cargando...</p>
      </div>
    </div>
  )
}