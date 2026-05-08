import { useState, useRef, useEffect } from 'react'
import { ScanLine, ChevronDown, User, Check } from 'lucide-react'

// --- Dropdown custom reutilizable ---
interface SelectOption { label: string; value: string }

function CustomSelect({
    options,
    value,
    onChange,
    icon: Icon,
    placeholder,
}: {
    options: SelectOption[]
    value: string
    onChange: (v: string) => void
    icon?: React.ElementType
    placeholder?: string
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const selected = options.find(o => o.value === value)

    return (
        <div ref={ref} className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className={
                    'flex items-center gap-2 h-10 w-full rounded-lg border border-border/60 bg-background/60 ' +
                    'px-3 text-sm text-foreground transition-all duration-150 ' +
                    'hover:border-foreground/20 hover:bg-background focus:outline-none ' +
                    (open ? 'border-foreground/20 bg-background' : '')
                }
            >
                {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />}
                <span className={`flex-1 text-left truncate ${!selected ? 'text-muted-foreground/40' : ''}`}>
                    {selected?.label ?? placeholder ?? 'Seleccionar'}
                </span>
                <ChevronDown
                    className={`w-3.5 h-3.5 text-muted-foreground/40 shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div className="absolute z-50 top-[calc(100%+6px)] left-0 right-0 rounded-lg border border-border/60 bg-card shadow-md overflow-hidden">
                    {options.map(opt => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => { onChange(opt.value); setOpen(false) }}
                            className={
                                'flex items-center gap-2 w-full px-3 py-2.5 text-sm text-left ' +
                                'hover:bg-muted/60 transition-colors duration-100 ' +
                                (opt.value === value ? 'text-foreground font-medium' : 'text-foreground/70')
                            }
                        >
                            <Check
                                className={`w-3.5 h-3.5 shrink-0 transition-opacity ${opt.value === value ? 'opacity-100 text-foreground' : 'opacity-0'}`}
                            />
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// --- Barra principal ---
const VENDEDORES: SelectOption[] = [
    { label: 'Sin vendedor', value: '' },
    { label: 'Juan Pérez', value: 'juan' },
    { label: 'María López', value: 'maria' },
    { label: 'Carlos Ruiz', value: 'carlos' },
]

const MONEDAS: SelectOption[] = [
    { label: 'PEN — S/', value: 'PEN' },
    { label: 'USD — $', value: 'USD' },
    { label: 'EUR — €', value: 'EUR' },
]

interface ProductSearchBarProps {
    ruc?: string
    empresa?: string
}

export function ProductSearchBar({ ruc = '20522094120', empresa = 'APT' }: ProductSearchBarProps) {
    const [sku, setSku] = useState('')
    const [nombre, setNombre] = useState('')
    const [vendedor, setVendedor] = useState('')
    const [dscto, setDscto] = useState('')
    const [moneda, setMoneda] = useState('PEN')
    const nombreRef = useRef<HTMLInputElement>(null)

    const fieldLabel = 'block text-[10px] font-medium text-muted-foreground/70 uppercase tracking-widest mb-1.5'

    const inputBase =
        'h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground ' +
        'placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-border ' +
        'transition-all duration-150'

    return (
        <div className="rounded-2xl border border-border bg-card overflow-visible shadow-sm">

            <div className="flex items-center justify-between px-5 py-2.5 border-b border-border bg-muted rounded-t-2xl">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                    <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">{ruc}</span>
                    <span className="text-[11px] text-muted-foreground/40">·</span>
                    <span className="text-[11px] font-semibold text-foreground/70 tracking-wider uppercase">{empresa}</span>
                </div>
                <span className="text-[10px] text-muted-foreground/40 tracking-wide">Nueva venta</span>
            </div>

            <div className="flex items-end gap-4 px-5 py-4">

                {/* SKU */}
                <div className="w-32 shrink-0">
                    <label className={fieldLabel}>Código</label>
                    <input
                        type="text"
                        placeholder="SKU-001"
                        value={sku}
                        onChange={e => setSku(e.target.value.toUpperCase())}
                        onKeyDown={e => e.key === 'Enter' && nombreRef.current?.focus()}
                        className={`${inputBase} font-mono text-xs tracking-widest`}
                    />
                </div>

                <div className="w-px h-10 bg-border shrink-0" />

                {/* Nombre */}
                <div className="flex-1 min-w-0">
                    <label className={fieldLabel}>Nombre del producto</label>
                    <div className="relative">
                        <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30 pointer-events-none" />
                        <input
                            ref={nombreRef}
                            type="text"
                            placeholder="Escribe o escanea un producto..."
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className={`${inputBase} pl-9`}
                        />
                    </div>
                </div>

                {/* Vendedor — dropdown custom */}
                <div className="w-40 shrink-0">
                    <label className={fieldLabel}>Vendedor</label>
                    <CustomSelect
                        options={VENDEDORES}
                        value={vendedor}
                        onChange={setVendedor}
                        icon={User}
                        placeholder="Sin vendedor"
                    />
                </div>

                {/* Descuento */}
                <div className="w-28 shrink-0">
                    <label className={fieldLabel}>Descuento</label>
                    <div className="relative">
                        <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder="0"
                            value={dscto}
                            onChange={e => setDscto(e.target.value)}
                            className={`${inputBase} pr-8 text-center`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground/50 pointer-events-none">
                            %
                        </span>
                    </div>
                </div>

                {/* Moneda — dropdown custom */}
                <div className="w-28 shrink-0">
                    <label className={fieldLabel}>Moneda</label>
                    <CustomSelect
                        options={MONEDAS}
                        value={moneda}
                        onChange={setMoneda}
                    />
                </div>

            </div>
        </div>
    )
}