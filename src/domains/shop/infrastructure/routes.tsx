import { withProtectedRoute } from '@/shared/infrastructure/routing/withProtectedRoute'
import { withSuspense } from '@/shared/infrastructure/routing/withSuspense'
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Shop = lazy(() => import('../pages/Shop'))

export const shopRoutes: RouteObject[] = [
  {
    path: '/shop',
    element: withSuspense(withProtectedRoute(<Shop />)),
  },
]
