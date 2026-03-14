import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { LoadingFallback } from '@/shared/components/LoadingFallback'
import { dashboardRoutes } from '@/domains/dashboard/infrastructure/routes'
import { authRoutes } from '@/auth/infrastructure/routes'
import { inventoryRoutes } from '@/domains/inventory/infrastructure/routes'
import { salesRoutes } from '@/domains/sales/infrastructure/routes'
import { shopRoutes } from '@/domains/shop/infrastructure/routes'
import { reportsRoutes } from '@/domains/reports/infrastructure/routes'
import { settingsRoutes } from '@/domains/settings/infrastructure/routes'

const RootLayout = lazy(() => import('@/app/layouts/RootLayout'))
const NotFound = lazy(() => import('@/shared/pages/NotFound'))

const domainRoutes = [
  ...dashboardRoutes,
  ...authRoutes,
  ...inventoryRoutes,
  ...salesRoutes,
  ...shopRoutes,
  ...reportsRoutes,
  ...settingsRoutes,
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      ...domainRoutes,
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])
