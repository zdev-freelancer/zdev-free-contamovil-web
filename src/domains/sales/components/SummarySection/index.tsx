// src/domains/sales/components/SummarySection/index.tsx
import { useState } from 'react'
import { Calendar, RotateCcw } from 'lucide-react'
import { CustomSelect, type SelectOption } from '@/shared/components/CustomSelect'

const CONDICIONES: SelectOption[] = [
  { label: 'Contado',       value: 'contado'       },
  { label: 'VISA',          value: 'visa'          },
  { label: 'VISA Débito',   value: 'visa_debito'   },
  { label: 'Yape',          value: 'yape'          },
  { label: 'Plin',          value: 'plin'          },
  { label: 'Transferencia', value: 'transferencia' },
]

const IMPUESTOS: SelectOption[] = [
  { label: '—',          value: ''          },
  { label: 'Detracción', value: 'detraccion' },
  { label: 'Retención',  value: 'retencion'  },
]

interface ResumenData {
  gravado:   number
  inafecto:  number
  exonerado: number
  anticipo:  number
  isc:       number
  igv:       number
  rc:        number
  icbper:    number
  gratuito:  number
}

const DEFAULT_RESUMEN: ResumenData = {
  gravado: 0, inafecto: 0, exonerado: 0, anticipo: 0,
  isc: 0, igv: 0, rc: 0, icbper: 0, gratuito: 0,
}

const fmt = (n: number) => n.toFixed(2)

const labelClass = 'block text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-1.5'

export function SummarySection({ resumen = DEFAULT_RESUMEN }: { resumen?: ResumenData }) {
  const [condicion, setCondicion] = useState('contado')
  const [impuesto, setImpuesto]   = useState('')
  const [fecha] = useState(() =>
    new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  )

  const total =
    resumen.gravado + resumen.inafecto + resumen.exonerado +
    resumen.isc + resumen.igv + resumen.rc + resumen.icbper - resumen.anticipo

  const rows: { label: string; value: number; dim: boolean }[] = [
    { label: 'Gravado',    value: resumen.gravado,   dim: false },
    { label: 'Inafecto',   value: resumen.inafecto,  dim: true  },
    { label: 'Exonerado',  value: resumen.exonerado, dim: true  },
    { label: 'Anticipo',   value: resumen.anticipo,  dim: true  },
    { label: 'ISC',        value: resumen.isc,       dim: true  },
    { label: 'IGV',        value: resumen.igv,       dim: false },
    { label: 'R.C. (13%)', value: resumen.rc,        dim: true  },
    { label: 'ICBPER',     value: resumen.icbper,    dim: true  },
  ]

  return (
    <div className="flex flex-col h-full rounded-[16px] border border-border bg-card overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3 border-b border-border shrink-0">
        <p className="text-sm font-semibold">Resumen</p>
        <p className="text-xs text-muted-foreground mt-0.5">Totales del pedido</p>
      </div>

      {/* Cuerpo — justify-between empuja controles al fondo */}
      <div className="flex flex-col flex-1 justify-between px-4 py-3">

        {/* Filas de importes */}
        <div>
          {rows.map(row => (
            <div
              key={row.label}
              className={`flex items-center justify-between py-1 transition-opacity ${
                row.dim && row.value === 0 ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <span className="text-xs text-muted-foreground">{row.label}</span>
              <span className={`text-xs tabular-nums font-medium ${
                row.value > 0 ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {fmt(row.value)}
              </span>
            </div>
          ))}

          {/* Total */}
          <div className="flex items-center justify-between border-t border-border mt-2 pt-2.5">
            <span className="text-sm font-bold text-foreground">TOTAL</span>
            <span className="text-lg font-bold tabular-nums text-foreground">
              {fmt(total)}
            </span>
          </div>

          {/* Gratuito */}
          <div className={`flex items-center justify-between pt-1 ${
            resumen.gratuito === 0 ? 'opacity-30' : ''
          }`}>
            <span className="text-xs text-muted-foreground">Gratuito</span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {fmt(resumen.gratuito)}
            </span>
          </div>
        </div>

        {/* Controles — anclan al fondo gracias a justify-between */}
        <div className="space-y-3 pt-3 border-t border-border">

          {/* Fecha */}
          <div className="flex items-center justify-between">
            <span className={labelClass}>Fecha de registro</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tabular-nums text-foreground">{fecha}</span>
              <button className="w-7 h-7 rounded-lg border border-border bg-muted flex items-center justify-center hover:bg-card transition-colors">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Condición de pago */}
          <div>
            <label className={labelClass}>Condición de pago</label>
            <CustomSelect
              options={CONDICIONES}
              value={condicion}
              onChange={setCondicion}
              placeholder="Seleccionar"
            />
          </div>

          {/* Impuestos + Redondear */}
          <div className="flex gap-2 items-end">
            <div className="flex-1 min-w-0">
              <label className={labelClass}>Impuestos</label>
              <CustomSelect
                options={IMPUESTOS}
                value={impuesto}
                onChange={setImpuesto}
                placeholder="Ninguno"
              />
            </div>
            <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border bg-card shrink-0 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <RotateCcw className="w-3.5 h-3.5" />
              Redondear
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}