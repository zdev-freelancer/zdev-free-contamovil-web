import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/shared/lib/supabaseClient'
import { useAuthStore } from '@/app/stores/authStore'

export interface Product {
  id: string
  name: string
  sale_price: number
  purchase_price: number
  current_stock: number
  min_stock: number
  unit_type: string
  image_url: string | null
  category: { id: string; name: string; icon: string } | null
  seasons: { id: string; name: string }[]
}

interface Filters {
  categoryId: string | null
  seasonId: string | null
  search: string
}

const PAGE_SIZE = 10

export function useProducts(filters: Filters) {
  const tenantId = useAuthStore((s) => s.tenantId())
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchProducts = useCallback(async () => {
    if (!tenantId) return
    setLoading(true)
    setError(null)

    let query = supabase
      .from('products')
      .select(`
        id, name, sale_price, purchase_price,
        current_stock, min_stock, unit_type, image_url,
        category:categories(id, name, icon),
        seasons:product_seasons(season:seasons(id, name))
      `, { count: 'exact' })
      .eq('tenant_id', tenantId)
      .is('deleted_at', null)
      .order('name')
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

    if (filters.categoryId) query = query.eq('category_id', filters.categoryId)
    if (filters.search) query = query.ilike('name', `%${filters.search}%`)

    const { data, error, count } = await query

    if (error) { setError('Error al cargar productos'); setLoading(false); return }

    const normalized = (data ?? []).map((p: any) => ({
      ...p,
      seasons: p.seasons?.map((ps: any) => ps.season).filter(Boolean) ?? [],
    }))

    const filtered = filters.seasonId
      ? normalized.filter((p) => p.seasons.some((s: any) => s.id === filters.seasonId))
      : normalized

    setProducts(filtered)
    setTotal(count ?? 0)
    setLoading(false)
  }, [tenantId, filters.categoryId, filters.seasonId, filters.search, page])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  // Reset page on filter change
  useEffect(() => { setPage(1) }, [filters.categoryId, filters.seasonId, filters.search])

  const deleteProduct = async (id: string) => {
    await supabase
      .from('products')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
    fetchProducts()
  }

  return {
    products, loading, error,
    page, setPage,
    totalPages: Math.ceil(total / PAGE_SIZE),
    deleteProduct,
    refetch: fetchProducts,
  }
}