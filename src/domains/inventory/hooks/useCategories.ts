import { useEffect, useState } from 'react'
import { supabase } from '@/shared/lib/supabaseClient'
import { useAuthStore } from '@/app/stores/authStore'

export interface Category {
  id: string
  name: string
  icon: string
}

export function useCategories() {
  const tenantId = useAuthStore((s) => s.tenantId())
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    if (!tenantId) return

    supabase
      .from('categories')
      .select('id, name, icon')
      .eq('tenant_id', tenantId)
      .order('name')
      .then(({ data }) => setCategories(data ?? []))
  }, [tenantId])

  return { categories }
}