import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useRouteTransition = () => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState<'enter' | 'exit'>('enter')

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('exit')
    }
  }, [location, displayLocation])

  useEffect(() => {
    if (transitionStage === 'exit') {
      const timer = setTimeout(() => {
        setDisplayLocation(location)
        setTransitionStage('enter')
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [transitionStage, location])

  return {
    displayLocation,
    transitionStage,
  }
}