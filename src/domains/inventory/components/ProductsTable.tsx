import { Pencil, Trash2, AlertTriangle, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '../hooks/useProducts'

type SortKey = 'sale_price' | 'purchase_price' | 'current_stock'
type SortDir = 'asc' | 'desc'

interface Props {
  products: Product[]
  loading: boolean
  page: number
  totalPages: number
  onPageChange: (p: number) => void
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export function ProductsTable({
  products, loading, page, totalPages, onPageChange, onEdit, onDelete,
}: Props) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...products].sort((a, b) => {
    if (!sortKey) return 0
    const valA = a[sortKey] ?? 0
    const valB = b[sortKey] ?? 0
    return sortDir === 'asc' ? valA - valB : valB - valA
  })

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ChevronsUpDown className="w-3 h-3 opacity-40" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3" />
      : <ChevronDown className="w-3 h-3" />
  }

  const SortTh = ({ label, k }: { label: string; k: SortKey }) => (
    <th
      onClick={() => handleSort(k)}
      className="px-3 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wide text-right cursor-pointer select-none hover:text-foreground transition-colors"
    >
      <span className="inline-flex items-center justify-end gap-1">
        {label}
        <SortIcon k={k} />
      </span>
    </th>
  )

  if (loading) return (
    <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
      Cargando productos...
    </div>
  )

  if (products.length === 0) return (
    <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
      No se encontraron productos
    </div>
  )

  const Pagination = () => totalPages > 1 ? (
    <div className="flex items-center justify-between px-3 py-3 border-t border-border text-xs text-muted-foreground">
      <span>Página {page} de {totalPages}</span>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="h-7 px-2.5 rounded-md border border-border disabled:opacity-40 hover:bg-muted transition-colors"
        >‹</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
          .reduce<(number | '...')[]>((acc, n, i, arr) => {
            if (i > 0 && n - (arr[i - 1] as number) > 1) acc.push('...')
            acc.push(n)
            return acc
          }, [])
          .map((n, i) =>
            n === '...'
              ? <span key={i} className="h-7 px-1 flex items-center">…</span>
              : <button
                  key={n}
                  onClick={() => onPageChange(n as number)}
                  className={`h-7 min-w-[28px] px-2 rounded-md border transition-colors
                    ${page === n
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border hover:bg-muted'}`}
                >{n}</button>
          )
        }
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="h-7 px-2.5 rounded-md border border-border disabled:opacity-40 hover:bg-muted transition-colors"
        >›</button>
      </div>
    </div>
  ) : null

  return (
    <div>
      {/* MÓVIL */}
      <div className="md:hidden divide-y divide-border">
        {sorted.map((p) => {
          const lowStock = p.current_stock <= p.min_stock
          return (
            <div key={p.id} className="p-3 flex gap-3">
              <div className="w-10 h-10 rounded-md border border-border bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                {p.image_url
                  ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  : <span className="text-sm font-medium text-muted-foreground">{p.name[0]}</span>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{p.name}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {p.category && (
                    <span className="px-2 py-0.5 rounded-full text-xs border border-border bg-muted/50 text-muted-foreground">
                      {p.category.icon} {p.category.name}
                    </span>
                  )}
                  {p.seasons.map((s) => (
                    <span key={s.id} className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800">
                      {s.name}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-3 text-xs">
                    <span className="font-medium">S/ {p.sale_price.toFixed(2)}</span>
                    <span className="text-muted-foreground">Compra: S/ {(p.purchase_price ?? 0).toFixed(2)}</span>
                  </div>
                  <span className={`text-xs inline-flex items-center gap-1 ${lowStock ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                    {lowStock && <AlertTriangle className="w-3 h-3" />}
                    {p.current_stock} {p.unit_type}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button onClick={() => onEdit(p)} className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors text-muted-foreground">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => onDelete(p.id)} className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-colors text-muted-foreground">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* DESKTOP */}
      <table className="hidden md:table w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="px-3 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wide text-left">Producto</th>
            <th className="px-3 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wide text-left">Categoría</th>
            <th className="px-3 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wide text-left">Temporadas</th>
            <SortTh label="Venta" k="sale_price" />
            <SortTh label="Compra" k="purchase_price" />
            <SortTh label="Stock" k="current_stock" />
            <th className="px-3 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => {
            const lowStock = p.current_stock <= p.min_stock
            return (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md border border-border bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                      {p.image_url
                        ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                        : <span className="text-xs text-muted-foreground">{p.name[0]}</span>
                      }
                    </div>
                    <span className="font-medium text-foreground">{p.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  {p.category
                    ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border border-border bg-muted/50 text-muted-foreground">
                        {p.category.icon} {p.category.name}
                      </span>
                    : <span className="text-muted-foreground">—</span>
                  }
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {p.seasons.length > 0
                      ? p.seasons.map((s) => (
                          <span key={s.id} className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800">
                            {s.name}
                          </span>
                        ))
                      : <span className="text-muted-foreground">—</span>
                    }
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums">S/ {p.sale_price.toFixed(2)}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">S/ {(p.purchase_price ?? 0).toFixed(2)}</td>
                <td className="px-3 py-2.5 text-right">
                  <span className={`inline-flex items-center justify-end gap-1 tabular-nums ${lowStock ? 'text-destructive font-medium' : ''}`}>
                    {lowStock && <AlertTriangle className="w-3 h-3" />}
                    {p.current_stock} {p.unit_type}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => onEdit(p)} className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => onDelete(p.id)} className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-colors text-muted-foreground">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Pagination />
    </div>
  )
}