import { Outlet, useLocation } from 'react-router-dom'
import { AppSidebar } from '@/shared/components/navigation/AppSidebar'
import { AppNavbar } from '@/shared/components/navigation/AppNavbar'
import { SidebarInset } from '@/shared/ui/sidebar'
import { RouteTransitionWrapper } from '@/shared/components/wrappers/RouteTransitionWrapper'
import '@/shared/styles/route-transitions.css'



export default function RootLayout() {
  const location = useLocation()

  const hideNavRoutes = ['/authentication']
  const shouldHideNav = hideNavRoutes.includes(location.pathname)

  if (shouldHideNav) {
    return (
      <div className="h-dvh w-dvw">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="flex h-dvh w-dvw overflow-hidden bg-sidebar">
      {/* Sidebar fijo */}
      <AppSidebar />

      {/* Contenido principal flotante */}
      <SidebarInset className="flex-1 flex flex-col min-h-0 overflow-hidden bg-card md:peer-data-[variant=inset]:rounded-[16px] md:border md:border-border shadow-sm">
        {/* Navbar global fija */}
        <AppNavbar />

        {/* Espacio para cada página (Outlet) */}
        <div className="flex-1 flex flex-col overflow-auto p-4 bg-transparent">
          <RouteTransitionWrapper>
            <Outlet />
          </RouteTransitionWrapper>
        </div>
      </SidebarInset>
    </div>
  )
}