import {
  type LucideIcon,
  Home,
  Package,
  ShoppingCart,
  Store,
  BarChart3,
  Settings,
} from 'lucide-react'

export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: LucideIcon
  badge?: string | number
  disabled?: boolean
  requiresAuth?: boolean // para ProtectedRoute
  guestOnly?: boolean // para GuestRoute
  showInSidebar?: boolean
  showInNavbar?: boolean
  showInMobile?: boolean
  children?: NavigationItem[]
}

export const navigationConfig: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    requiresAuth: true,
    showInSidebar: true,
    showInNavbar: false,
    showInMobile: true,
  },
  {
    id: 'inventory',
    label: 'Inventario',
    href: '/inventory',
    icon: Package,
    requiresAuth: true,
    showInSidebar: true,
    showInNavbar: false,
    showInMobile: true,
  },
  {
    id: 'sales',
    label: 'Ventas',
    href: '/sales',
    icon: ShoppingCart,
    requiresAuth: true,
    showInSidebar: true,
    showInNavbar: false,
    showInMobile: true,
  },
  {
    id: 'shop',
    label: 'Tienda',
    href: '/shop',
    icon: Store,
    requiresAuth: true,
    showInSidebar: true,
    showInNavbar: false,
    showInMobile: true,
  },
  {
    id: 'reports',
    label: 'Reportes',
    href: '/reports',
    icon: BarChart3,
    requiresAuth: true,
    showInSidebar: true,
    showInNavbar: false,
    showInMobile: true,
  },
  {
    id: 'settings',
    label: 'Configuración',
    href: '/settings',
    icon: Settings,
    requiresAuth: true,
    showInSidebar: true, // Though it will explicitly be in the bottom pinned section
    showInNavbar: false,
    showInMobile: true,
  },
  // Rutas de guest (sin auth)
  {
    id: 'authentication',
    label: 'Autenticación',
    href: '/authentication',
    guestOnly: true, // ← Solo para GuestRoute
    showInSidebar: false,
    showInNavbar: false,
    showInMobile: false,
  },
]

// Helpers para filtrar rutas
export const getSidebarRoutes = () =>
  navigationConfig.filter((item) => item.showInSidebar && item.requiresAuth && item.id !== 'settings') // Handle settings specifically

export const getNavbarRoutes = () =>
  navigationConfig.filter((item) => item.showInNavbar && item.requiresAuth)

export const getMobileRoutes = () =>
  navigationConfig.filter((item) => item.showInMobile && item.requiresAuth)

export const getGuestRoutes = () =>
  navigationConfig.filter((item) => item.guestOnly)

export const getProtectedRoutes = () =>
  navigationConfig.filter((item) => item.requiresAuth)
