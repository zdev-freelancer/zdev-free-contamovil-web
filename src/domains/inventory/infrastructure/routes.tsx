import { withProtectedRoute } from '@/shared/infrastructure/routing/withProtectedRoute'
import { withSuspense } from '@/shared/infrastructure/routing/withSuspense'
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Inventory = lazy(() => import('../pages/Inventory'))

export const inventoryRoutes: RouteObject[] = [
  {
    path: '/inventory',
    element: withSuspense(withProtectedRoute(<Inventory />)),
  },
]
