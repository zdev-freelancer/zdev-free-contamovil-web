import { withProtectedRoute } from '@/shared/infrastructure/routing/withProtectedRoute'
import { withSuspense } from '@/shared/infrastructure/routing/withSuspense'
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Sales = lazy(() => import('../pages/Sales'))

export const salesRoutes: RouteObject[] = [
  {
    path: '/sales',
    element: withSuspense(withProtectedRoute(<Sales />)),
  },
]
