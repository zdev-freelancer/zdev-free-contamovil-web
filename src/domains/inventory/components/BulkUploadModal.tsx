import { useRef, useState } from 'react'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Upload, Download, CheckCircle2, XCircle } from 'lucide-react'
import { supabase } from '@/shared/lib/supabaseClient'
import { useAuthStore } from '@/app/stores/authStore'
import type { Category } from '../hooks/useCategories'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  categories: Category[]
}

interface RowResult {
  row: number
  name: string
  status: 'ok' | 'error'
  message?: string
}

export function BulkUploadModal({ open, onClose, onSuccess, categories }: Props) {
  const tenantId = useAuthStore((s) => s.tenantId())
  const inputRef = useRef<HTMLInputElement>(null)
  const [results, setResults] = useState<RowResult[]>([])
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleClose = () => { setResults([]); setDone(false); onClose() }

  // Descarga plantilla con ExcelJS
  const downloadTemplate = async () => {
    const ExcelJS = (await import('exceljs')).default
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet('Productos')

    ws.columns = [
      { header: 'nombre',        key: 'nombre',        width: 24 },
      { header: 'precio_venta',  key: 'precio_venta',  width: 14 },
      { header: 'precio_compra', key: 'precio_compra', width: 14 },
      { header: 'stock',         key: 'stock',         width: 10 },
      { header: 'stock_minimo',  key: 'stock_minimo',  width: 14 },
      { header: 'unidad',        key: 'unidad',        width: 12 },
      { header: 'categoria',     key: 'categoria',     width: 18 },
    ]

    // Estilo encabezado
    ws.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF6366F1' } }
      cell.alignment = { horizontal: 'center' }
    })

    // Filas de ejemplo
    ws.addRow({ nombre: 'Polo Oversize',  precio_venta: 45,  precio_compra: 18, stock: 50, stock_minimo: 5, unidad: 'unidad', categoria: 'Ropa' })
    ws.addRow({ nombre: 'Shampoo HS 1L', precio_venta: 14,  precio_compra: 10, stock: 30, stock_minimo: 3, unidad: 'unidad', categoria: 'Aseo' })

    // Nota de unidades válidas
    const noteRow = ws.addRow([])
    ws.addRow(['Unidades válidas: unidad, kg, litro, metro, caja, docena'])
    ws.getRow(noteRow.number + 1).getCell(1).font = { italic: true, color: { argb: 'FF888888' } }

    const buffer = await wb.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'plantilla_productos.xlsx'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Procesa archivo con ExcelJS
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !tenantId) return

    setLoading(true)
    setResults([])
    setDone(false)

    const ExcelJS = (await import('exceljs')).default
    const wb = new ExcelJS.Workbook()
    const buffer = await file.arrayBuffer()
    await wb.xlsx.load(buffer)

    const ws = wb.worksheets[0]
    const results: RowResult[] = []

    // Obtener headers de la primera fila
    const headerRow = ws.getRow(1)
    const headers: Record<string, number> = {}
    headerRow.eachCell((cell, colNumber) => {
      headers[String(cell.value).trim().toLowerCase()] = colNumber
    })

    const getCell = (row: any, key: string) => {
      const col = headers[key]
      if (!col) return ''
      const val = row.getCell(col).value
      return val === null || val === undefined ? '' : String(val).trim()
    }

    // Iterar desde fila 2
    for (let rowNum = 2; rowNum <= ws.rowCount; rowNum++) {
      const row = ws.getRow(rowNum)

      // Saltar filas vacías
      const name = getCell(row, 'nombre')
      if (!name) continue

      const salePriceRaw = parseFloat(getCell(row, 'precio_venta'))
      if (isNaN(salePriceRaw)) {
        results.push({ row: rowNum, name, status: 'error', message: 'Precio de venta inválido' })
        continue
      }

      const catName = getCell(row, 'categoria').toLowerCase()
      const category = categories.find((c) => c.name.toLowerCase() === catName)

      const unitType = getCell(row, 'unidad') || 'unidad'
      const validUnits = ['unidad', 'kg', 'litro', 'metro', 'caja', 'docena']

      if (!validUnits.includes(unitType)) {
        results.push({ row: rowNum, name, status: 'error', message: `Unidad inválida: ${unitType}` })
        continue
      }

      const { error } = await supabase.from('products').insert({
        name,
        sale_price: salePriceRaw,
        purchase_price: parseFloat(getCell(row, 'precio_compra')) || 0,
        current_stock: parseInt(getCell(row, 'stock')) || 0,
        min_stock: parseInt(getCell(row, 'stock_minimo')) || 0,
        unit_type: unitType,
        category_id: category?.id ?? null,
        tenant_id: tenantId,
      })

      results.push({
        row: rowNum,
        name,
        status: error ? 'error' : 'ok',
        message: error ? 'Error al insertar' : undefined,
      })
    }

    setResults(results)
    setLoading(false)
    setDone(true)

    if (results.some((r) => r.status === 'ok')) onSuccess()
    if (inputRef.current) inputRef.current.value = ''
  }

  const okCount = results.filter((r) => r.status === 'ok').length
  const errCount = results.filter((r) => r.status === 'error').length

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Carga masiva de productos</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {/* Paso 1 */}
          <div className="rounded-lg border border-border p-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">1. Descarga la plantilla</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Completa los datos y sube el archivo
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={downloadTemplate} className="gap-2 shrink-0">
              <Download className="w-3.5 h-3.5" />
              Plantilla
            </Button>
          </div>

          {/* Paso 2 */}
          <div
            className="rounded-lg border border-dashed border-border p-6 flex flex-col items-center gap-3 cursor-pointer hover:bg-muted/30 transition-colors"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              Sube tu archivo Excel con los productos
            </p>
            <Button variant="outline" size="sm" disabled={loading} onClick={(e) => e.stopPropagation()}>
              {loading ? 'Procesando...' : 'Seleccionar archivo'}
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleFile}
            />
          </div>

          {/* Resultados */}
          {done && (
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 text-sm">
                <span className="text-green-600 font-medium">✓ {okCount} insertados</span>
                {errCount > 0 && (
                  <span className="text-destructive font-medium">✗ {errCount} errores</span>
                )}
              </div>
              <div className="max-h-48 overflow-y-auto flex flex-col gap-1">
                {results.map((r) => (
                  <div
                    key={r.row}
                    className={`flex items-center gap-2 text-xs px-2 py-1.5 rounded-md ${
                      r.status === 'ok'
                        ? 'bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200'
                        : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {r.status === 'ok'
                      ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      : <XCircle className="w-3.5 h-3.5 shrink-0" />
                    }
                    <span>Fila {r.row}: <strong>{r.name}</strong></span>
                    {r.message && <span className="ml-auto opacity-80">{r.message}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}