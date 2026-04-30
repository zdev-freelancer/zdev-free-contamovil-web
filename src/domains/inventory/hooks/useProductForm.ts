import { useState } from 'react'
import { supabase } from '@/shared/lib/supabaseClient'
import { useAuthStore } from '@/app/stores/authStore'

export interface ProductFormData {
  name: string
  sale_price: string
  purchase_price: string
  current_stock: string
  min_stock: string
  unit_type: string
  category_id: string
  season_ids: string[]
  image_url: string
}

const empty: ProductFormData = {
  name: '',
  sale_price: '',
  purchase_price: '',
  current_stock: '0',
  min_stock: '0',
  unit_type: 'unidad',
  category_id: '',
  season_ids: [],
  image_url: '',
}

export function useProductForm(onSuccess: () => void) {
  const tenantId = useAuthStore((s) => s.tenantId())
  const [form, setForm] = useState<ProductFormData>(empty)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof ProductFormData, value: any) =>
    setForm((f) => ({ ...f, [field]: value }))

  const reset = () => { setForm(empty); setError(null) }

  const submit = async () => {
    if (!tenantId) return
    if (!form.name.trim()) { setError('El nombre es obligatorio'); return }
    if (!form.sale_price) { setError('El precio de venta es obligatorio'); return }

    setLoading(true)
    setError(null)

    const { data: product, error: insertError } = await supabase
      .from('products')
      .insert({
        name: form.name.trim(),
        sale_price: parseFloat(form.sale_price),
        purchase_price: parseFloat(form.purchase_price || '0'),
        current_stock: parseInt(form.current_stock || '0'),
        min_stock: parseInt(form.min_stock || '0'),
        unit_type: form.unit_type,
        category_id: form.category_id || null,
        image_url: form.image_url || null,
        tenant_id: tenantId,
      })
      .select('id')
      .single()

    if (insertError) {
      setError('Error al guardar el producto')
      setLoading(false)
      return
    }

    // Insertar temporadas
    if (form.season_ids.length > 0) {
      await supabase.from('product_seasons').insert(
        form.season_ids.map((season_id) => ({
          product_id: product.id,
          season_id,
        }))
      )
    }

    setLoading(false)
    reset()
    onSuccess()
  }

  return { form, set, reset, submit, loading, error }
}