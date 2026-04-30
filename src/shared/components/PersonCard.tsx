import { Crown } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useAuth } from '@/auth/hooks/useAuth'
import { getInitials, getShortName } from '../utils/nameHelpers'

export function PersonCard() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <PersonCardSkeleton />
  }

  const nameParts = user?.fullName?.split(' ') ?? []
  const displayName = getShortName(nameParts[0], nameParts[1])
  const initials = getInitials(nameParts[0], nameParts[1])

  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-8">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-semibold">{displayName}</span>

        <div className="flex items-center gap-1">
          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-lg">
            Plan Gratuito
          </span>
          <Crown className="w-3 h-3 text-primary" />
        </div>
      </div>
    </div>
  )
}

function PersonCardSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="size-8 rounded-full bg-muted animate-pulse" />
      <div className="flex flex-col gap-1">
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        <div className="h-5 w-20 bg-muted rounded animate-pulse" />
      </div>
    </div>
  )
}