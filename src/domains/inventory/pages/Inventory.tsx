import { useState } from 'react'
import { PageHeader } from '@/shared/components/PageHeader'
import { Button } from '@/shared/ui/button'
import { Plus, Upload } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'
import { useSeasons } from '../hooks/useSeasons'
import { InventoryFilters } from '../components/InventoryFilters'
import { ProductsTable } from '../components/ProductsTable'
import { ProductFormModal } from '../components/ProductFormModal'
import { BulkUploadModal } from '../components/BulkUploadModal'
import type { Product } from '../hooks/useProducts'

export default function Inventory() {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [seasonId, setSeasonId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showBulk, setShowBulk] = useState(false)

  const { categories } = useCategories()
  const { seasons } = useSeasons()
  const { products, loading, error, page, setPage, totalPages, deleteProduct, refetch } =
    useProducts({ search, categoryId, seasonId })

  const handleEdit = (product: Product) => {
    console.log('editar', product) // TODO: modal edición
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return
    await deleteProduct(id)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <PageHeader>
        <PageHeader.Content>
          <div>
            <PageHeader.Title>Inventario</PageHeader.Title>
            <p className="text-sm text-muted-foreground mt-1">
              Gestiona tus productos y existencias
            </p>
          </div>
          <PageHeader.Actions>
            <Button variant="outline" className="gap-2" onClick={() => setShowBulk(true)}>
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Carga masiva</span>
            </Button>
            <Button className="gap-2" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </Button>
          </PageHeader.Actions>
        </PageHeader.Content>
      </PageHeader>

      <main className="flex-1 overflow-auto p-4 flex flex-col gap-4">
        <InventoryFilters
          search={search}
          categoryId={categoryId}
          seasonId={seasonId}
          categories={categories}
          seasons={seasons}
          onSearchChange={setSearch}
          onCategoryChange={setCategoryId}
          onSeasonChange={setSeasonId}
        />

        {error && <p className="text-destructive text-sm">{error}</p>}

        <div className="rounded-[16px] border border-border bg-card overflow-hidden">
          <ProductsTable
            products={products}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>

      <ProductFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onSuccess={refetch}
        categories={categories}
        seasons={seasons}
      />

      <BulkUploadModal
        open={showBulk}
        onClose={() => setShowBulk(false)}
        onSuccess={refetch}
        categories={categories}
      />
    </div>
  )
}