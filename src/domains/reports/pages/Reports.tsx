import { PageHeader } from '@/shared/components/PageHeader'
import { Button } from '@/shared/ui/button'
import { Filter } from 'lucide-react'

export default function Reports() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <PageHeader>
        <PageHeader.Content>
          <div>
            <PageHeader.Title>Reportes</PageHeader.Title>
            <p className="text-sm text-muted-foreground mt-1">
              Visualiza estadísticas y balances
            </p>
          </div>
          <PageHeader.Actions>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              <span>Filtrar Fechas</span>
            </Button>
          </PageHeader.Actions>
        </PageHeader.Content>
      </PageHeader>

      <main className="flex-1 overflow-auto p-4">
        <div className="flex items-center justify-center h-full rounded-[16px] border border-border bg-card">
          <p className="text-muted-foreground">Módulo de reportes en construcción</p>
        </div>
      </main>
    </div>
  )
}
