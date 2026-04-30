import { SidebarTrigger } from '@/shared/ui/sidebar'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'
import { UserMenu } from './UserMenu'
import { NotificationButton } from './NotificationButton'

export function AppNavbar() {
  return (
    <header className="h-[56px] border-b border-border bg-transparent flex-shrink-0 z-10 transition-colors duration-150 flex items-center px-[24px]">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:flex hidden text-muted-foreground hover:text-foreground" />
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>

      <div className="flex-1 flex justify-end items-center">
        <div className="flex items-center gap-[16px]">
          <NotificationButton />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}