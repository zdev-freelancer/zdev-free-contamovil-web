import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Calendar, ChevronDown, Check, RotateCcw } from 'lucide-react'

export interface SelectOption { label: string; value: string }

export function CustomSelect({ options, value, onChange, placeholder }: {
  options: SelectOption[]
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)

  const updateCoords = useCallback(() => {
    if (!btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    setCoords({ top: r.bottom + 4, left: r.left, width: r.width })
  }, [])

  const handleOpen = () => {
    updateCoords()
    setOpen(p => !p)
  }

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (btnRef.current?.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const selected = options.find(o => o.value === value)

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={handleOpen}
        className={
          'flex items-center gap-2 h-9 w-full rounded-lg border border-border bg-card ' +
          'px-3 text-sm text-foreground transition-all hover:bg-muted focus:outline-none ' +
          (open ? 'bg-muted' : '')
        }
      >
        <span className={`flex-1 text-left truncate font-medium ${!selected ? 'text-muted-foreground' : ''}`}>
          {selected?.label ?? placeholder ?? '—'}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && createPortal(
        <div
          style={{ position: 'fixed', top: coords.top, left: coords.left, width: coords.width, zIndex: 9999 }}
          className="rounded-lg border border-border bg-card shadow-lg overflow-hidden"
        >
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={
                'flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-left ' +
                'hover:bg-muted transition-colors ' +
                (opt.value === value ? 'text-foreground font-semibold' : 'text-muted-foreground')
              }
            >
              <Check className={`w-3.5 h-3.5 shrink-0 ${opt.value === value ? 'opacity-100' : 'opacity-0'}`} />
              {opt.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}