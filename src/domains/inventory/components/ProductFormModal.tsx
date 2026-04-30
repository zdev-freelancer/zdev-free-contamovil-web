import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/shared/ui/select'
import type { Category } from '../hooks/useCategories'
import type { Season } from '../hooks/useSeasons'
import { useProductForm } from '../hooks/useProductForm'

const UNIT_TYPES = ['unidad', 'kg', 'litro', 'metro', 'caja', 'docena']

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  categories: Category[]
  seasons: Season[]
}

export function ProductFormModal({ open, onClose, onSuccess, categories, seasons }: Props) {
  const { form, set, reset, submit, loading, error } = useProductForm(() => {
    onSuccess()
    onClose()
  })

  const handleClose = () => { reset(); onClose() }

  const toggleSeason = (id: string) => {
    set('season_ids',
      form.season_ids.includes(id)
        ? form.season_ids.filter((s) => s !== id)
        : [...form.season_ids, id]
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo producto</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">

          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <Label>Nombre <span className="text-destructive">*</span></Label>
            <Input
              placeholder="Ej: Polo Oversize"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
            />
          </div>

          {/* Precios */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Precio venta <span className="text-destructive">*</span></Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">S/</span>
                <Input
                  className="pl-8"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.sale_price}
                  onChange={(e) => set('sale_price', e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Precio compra</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">S/</span>
                <Input
                  className="pl-8"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.purchase_price}
                  onChange={(e) => set('purchase_price', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Stock inicial</Label>
              <Input
                type="number"
                min="0"
                value={form.current_stock}
                onChange={(e) => set('current_stock', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Stock mínimo</Label>
              <Input
                type="number"
                min="0"
                value={form.min_stock}
                onChange={(e) => set('min_stock', e.target.value)}
              />
            </div>
          </div>

          {/* Unidad y Categoría */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Unidad</Label>
              <Select value={form.unit_type} onValueChange={(v) => set('unit_type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {UNIT_TYPES.map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Categoría</Label>
              <Select value={form.category_id || 'none'} onValueChange={(v) => set('category_id', v === 'none' ? '' : v)}>
                <SelectTrigger><SelectValue placeholder="Sin categoría" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin categoría</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.icon} {c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Temporadas */}
          {seasons.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <Label>Temporadas</Label>
              <div className="flex flex-wrap gap-2">
                {seasons.map((s) => {
                  const active = form.season_ids.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSeason(s.id)}
                      className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                        active
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {s.icon} {s.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* URL imagen */}
          <div className="flex flex-col gap-1.5">
            <Label>URL de imagen</Label>
            <Input
              placeholder="https://..."
              value={form.image_url}
              onChange={(e) => set('image_url', e.target.value)}
            />
            {form.image_url && (
              <img
                src={form.image_url}
                alt="preview"
                className="w-16 h-16 rounded-md object-cover border border-border mt-1"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            )}
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={submit} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar producto'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}