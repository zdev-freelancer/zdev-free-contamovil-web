import { useLocation } from 'react-router-dom'

export default function PlaceholderPage() {
  const location = useLocation()
  const moduleName = location.pathname.split('/')[1] || 'Módulo'

  return (
    <div className="flex flex-1 items-center justify-center h-full rounded-[16px] border border-border bg-card">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground capitalize">
          {moduleName}
        </h1>
        <p className="text-muted-foreground text-[14px]">
          Esta vista está en construcción.
        </p>
      </div>
    </div>
  )
}
