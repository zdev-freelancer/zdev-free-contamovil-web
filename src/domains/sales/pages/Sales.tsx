import { PageHeader } from '@/shared/components/PageHeader'
import { Button } from '@/shared/ui/button'
import { Plus } from 'lucide-react'

export default function Sales() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <PageHeader>
        <PageHeader.Content>
          <div>
            <PageHeader.Title>Ventas</PageHeader.Title>
            <p className="text-sm text-muted-foreground mt-1">
              Registra y administra tus ventas
            </p>
          </div>
          <PageHeader.Actions>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              <span>Nueva Venta</span>
            </Button>
          </PageHeader.Actions>
        </PageHeader.Content>
      </PageHeader>

      <main className="flex-1 overflow-auto p-4">
        <div className="flex items-center justify-center h-full rounded-[16px] border border-border bg-card">
          <p className="text-muted-foreground">Módulo de ventas en construcción</p>
        </div>
      </main>
    </div>
  )
}
