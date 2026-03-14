import { Link } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from '@/shared/ui/sidebar'
import { getSidebarRoutes } from '@/app/config/navigation.config'
import { NavItem } from './NavItem'
import { Settings } from 'lucide-react'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebarRoutes = getSidebarRoutes()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="h-[64px] flex items-center justify-start flex-row px-4">
        <Link to="/" className="flex items-center gap-3 overflow-hidden w-full">
          <div className="flex items-center justify-center h-[32px] w-[32px] bg-primary rounded-full flex-shrink-0" />
          <span className="text-[20px] font-bold tracking-tight lowercase text-foreground group-data-[collapsible=icon]:hidden whitespace-nowrap">
            contamóvil
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-2 py-4">
            <nav className="space-y-1">
              {sidebarRoutes.map((route) => (
                <NavItem
                  key={route.id}
                  to={route.href}
                  icon={route.icon}
                  badge={route.badge}
                  disabled={route.disabled}
                >
                  {route.label}
                </NavItem>
              ))}
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-2">
        <nav className="flex flex-col space-y-1 mb-2">
          <NavItem to="/settings" icon={Settings}>
            Configuración
          </NavItem>
        </nav>
      </SidebarFooter>
    </Sidebar>
  )
}
