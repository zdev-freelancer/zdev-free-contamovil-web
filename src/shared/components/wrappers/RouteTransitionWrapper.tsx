import { ReactNode } from 'react'
import { useRouteTransition } from '@/shared/hooks/use-route-transition'
import '@/shared/styles/route-transitions.css'

interface RouteTransitionWrapperProps {
  children: ReactNode
}

export const RouteTransitionWrapper = ({ children }: RouteTransitionWrapperProps) => {
  const { transitionStage } = useRouteTransition()

  return (
    <div className={`page-transition ${transitionStage === 'enter' ? 'route-fade-in' : 'route-fade-out'}`}>
      {children}
    </div>
  )
}