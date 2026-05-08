import { PageHeader } from '@/shared/components/PageHeader'
import { Button } from '@/shared/ui/button'
import { Plus } from 'lucide-react'

import { ProductsSection } from '../components/ProductsSection'
import { ProductSearchBar } from '../components/ProductSearchBar'
import { SummarySection } from '../components/SummarySection'

export default function Sales() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* <PageHeader>
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
      </PageHeader> */}

      <main className="flex-1 overflow-auto p-5 flex flex-col gap-3 min-h-0">
        <ProductSearchBar ruc="20522343420" empresa="APT" />

        {/* Separador con aire — divide visualmente sin ser pesado */}
        <div className="flex items-center gap-3 px-1">
          <div className="flex-1 h-px bg-border/30" />
          {/* <span className="text-[10px] text-muted-foreground/30 uppercase tracking-widest">
            pedido
          </span> */}
          <div className="flex-1 h-px bg-border/30" />
        </div>

        <div className="grid grid-cols-2 grid-rows-[1fr_auto] gap-3 flex-1 min-h-0">
          <ProductsSection />
          <SummarySection />
          {/* <CustomerSection />
          <CloseSection />  */}
        </div>
      </main>
    </div>
  )
}
