import { useState } from 'react'
import { Package, Trash2, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'

interface Product {
  id: string
  codigo: string
  descripcion: string
  stock: number
  und: string
  cant: number
  prec: number
  dct: number
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', codigo: 'P-001', descripcion: 'Laptop Dell Inspiron 15', stock: 12, und: 'UND', cant: 1, prec: 2500.00, dct: 0 },
  { id: '2', codigo: 'P-042', descripcion: 'Mouse Inalámbrico Logitech', stock: 45, und: 'UND', cant: 2, prec: 89.90, dct: 5 },
  { id: '3', codigo: 'P-118', descripcion: 'Teclado Mecánico RGB', stock: 8, und: 'UND', cant: 1, prec: 320.00, dct: 10 },
]

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [sortField, setSortField] = useState<keyof Product | null>(null)
  const [sortAsc, setSortAsc] = useState(true)

  const handleRemove = (id: string) =>
    setProducts(prev => prev.filter(p => p.id !== id))

  const handleCantChange = (id: string, delta: number) =>
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, cant: Math.max(1, Math.min(p.stock, p.cant + delta)) }
          : p
      )
    )

  const handleDctChange = (id: string, value: string) => {
    const dct = Math.min(100, Math.max(0, Number(value) || 0))
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, dct } : p)))
  }

  const handleSort = (field: keyof Product) => {
    if (sortField === field) setSortAsc(prev => !prev)
    else { setSortField(field); setSortAsc(true) }
  }

  const subtotal = (p: Product) => p.cant * p.prec * (1 - p.dct / 100)

  const sorted = [...products].sort((a, b) => {
    if (!sortField) return 0
    const va = a[sortField]; const vb = b[sortField]
    const cmp = va < vb ? -1 : va > vb ? 1 : 0
    return sortAsc ? cmp : -cmp
  })

  const SortIcon = ({ field }: { field: keyof Product }) =>
    sortField === field
      ? sortAsc
        ? <ChevronUp className="w-3 h-3 ml-0.5 inline" />
        : <ChevronDown className="w-3 h-3 ml-0.5 inline" />
      : <ChevronDown className="w-3 h-3 ml-0.5 inline opacity-20" />

  const thClass = 'px-3 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none whitespace-nowrap hover:text-foreground transition-colors'
  const tdClass = 'px-3 py-3 text-sm'

  return (
    // min-h-0 + flex-1 en el padre (Sales.tsx) hará que ocupe todo el espacio disponible
    // La sección siempre mantiene su tamaño completo gracias a h-full
    <div className="flex flex-col h-full min-h-[420px] rounded-[16px] border border-border bg-card overflow-hidden">

      {/* Header — siempre visible */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Package className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Productos seleccionados</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {products.length === 0
                ? 'Ningún producto agregado'
                : `${products.length} producto${products.length !== 1 ? 's' : ''} en el pedido`}
            </p>
          </div>
        </div>
        {products.length > 0 && (
          <Badge variant="secondary" className="text-xs tabular-nums">
            S/ {products.reduce((acc, p) => acc + subtotal(p), 0).toFixed(2)}
          </Badge>
        )}
      </div>

      {/* Cuerpo — ocupa todo el espacio restante */}
      <div className="flex-1 overflow-auto min-h-0">
        {products.length === 0 ? (
          // Estado vacío con protagonismo — ocupa todo el espacio
          <div className="flex flex-col items-center justify-center h-full gap-5 px-8 py-12">
            {/* Ilustración geométrica simple */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-border flex items-center justify-center bg-muted/30">
                <ShoppingCart className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">0</span>
              </div>
            </div>
            <div className="text-center space-y-1 max-w-[240px]">
              <p className="text-sm font-semibold text-foreground">
                Sin productos en el pedido
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Agrega productos desde el catálogo para comenzar a armar tu venta
              </p>
            </div>
            {/* Columnas fantasma para dar referencia visual de la tabla futura */}
            <div className="w-full max-w-sm mt-2 space-y-2 opacity-30 pointer-events-none select-none">
              {[80, 60, 70].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-2 rounded-full bg-muted" style={{ width: `${w}%` }} />
                  <div className="h-2 rounded-full bg-muted w-10 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <table className="w-full min-w-[640px]">
            <thead className="sticky top-0 bg-card border-b border-border z-10">
              <tr>
                <th className={`${thClass} w-8`} />
                <th className={thClass} onClick={() => handleSort('codigo')}>
                  Código <SortIcon field="codigo" />
                </th>
                <th className={thClass} onClick={() => handleSort('descripcion')}>
                  Descripción <SortIcon field="descripcion" />
                </th>
                <th className={`${thClass} text-center`} onClick={() => handleSort('stock')}>
                  Stock <SortIcon field="stock" />
                </th>
                <th className={`${thClass} text-center`}>Und</th>
                <th className={`${thClass} text-center`}>Cant</th>
                <th className={`${thClass} text-right`} onClick={() => handleSort('prec')}>
                  Precio <SortIcon field="prec" />
                </th>
                <th className={`${thClass} text-center`}>Dct %</th>
                <th className={`${thClass} text-right`}>Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map(p => (
                <tr key={p.id} className="hover:bg-muted/40 transition-colors group">
                  <td className={`${tdClass} pl-3`}>
                    <button
                      onClick={() => handleRemove(p.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/70"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className={tdClass}>
                    <span className="font-mono text-xs text-muted-foreground">{p.codigo}</span>
                  </td>
                  <td className={`${tdClass} max-w-[200px]`}>
                    <span className="block truncate text-xs font-medium">{p.descripcion}</span>
                  </td>
                  <td className={`${tdClass} text-center`}>
                    <span className={`text-xs font-medium ${p.stock <= 5 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className={`${tdClass} text-center`}>
                    <span className="text-xs text-muted-foreground">{p.und}</span>
                  </td>
                  <td className={`${tdClass} text-center`}>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleCantChange(p.id, -1)}
                        className="w-5 h-5 rounded border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors"
                      >−</button>
                      <span className="w-6 text-center text-xs font-semibold tabular-nums">{p.cant}</span>
                      <button
                        onClick={() => handleCantChange(p.id, +1)}
                        disabled={p.cant >= p.stock}
                        className="w-5 h-5 rounded border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors disabled:opacity-40"
                      >+</button>
                    </div>
                  </td>
                  <td className={`${tdClass} text-right tabular-nums text-xs`}>
                    S/ {p.prec.toFixed(2)}
                  </td>
                  <td className={`${tdClass} text-center`}>
                    <div className="flex items-center justify-center gap-0.5">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={p.dct}
                        onChange={e => handleDctChange(p.id, e.target.value)}
                        className="w-12 text-center text-xs border border-border rounded px-1 py-0.5 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                      <span className="text-xs text-muted-foreground">%</span>
                    </div>
                  </td>
                  <td className={`${tdClass} text-right tabular-nums text-xs font-semibold`}>
                    S/ {subtotal(p).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer — solo con productos */}
      {products.length > 0 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20 shrink-0">
          <span className="text-xs text-muted-foreground">
            {products.length} ítem{products.length !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Total parcial</span>
            <span className="text-sm font-bold text-foreground tabular-nums">
              S/ {products.reduce((acc, p) => acc + subtotal(p), 0).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}