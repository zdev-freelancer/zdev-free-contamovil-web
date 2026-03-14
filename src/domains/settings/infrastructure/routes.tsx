import { withProtectedRoute } from '@/shared/infrastructure/routing/withProtectedRoute'
import { withSuspense } from '@/shared/infrastructure/routing/withSuspense'
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Settings = lazy(() => import('../pages/Settings'))

export const settingsRoutes: RouteObject[] = [
  {
    path: '/settings',
    element: withSuspense(withProtectedRoute(<Settings />)),
  },
]
