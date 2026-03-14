import { Bell } from 'lucide-react'

export function NotificationButton() {
  return (
    <button 
      className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all duration-200"
      aria-label="Notificaciones"
    >
      <Bell className="h-4 w-4" />
    </button>
  )
}