import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { LogOut, User } from 'lucide-react'
import { getInitials, getShortName } from '@/shared/utils/nameHelpers'
import { useLogout } from '@/auth/hooks/useLogout'
import { useAuth } from '@/auth/hooks/useAuth'

export function UserMenu() {
  const { user } = useAuth()
  const { handleLogout } = useLogout()

  const nameParts = user?.fullName?.split(' ') ?? []
  const displayName = getShortName(nameParts[0], nameParts[1])
  const initials = getInitials(nameParts[0], nameParts[1])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all duration-200"
          aria-label="Menú de usuario"
        >
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="hidden md:flex flex-col gap-0.5 leading-none text-left">
            <span className="font-semibold text-sm">{displayName}</span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}