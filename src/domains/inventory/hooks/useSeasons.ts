import { useEffect, useState } from 'react'
import { supabase } from '@/shared/lib/supabaseClient'
import { useAuthStore } from '@/app/stores/authStore'

export interface Season {
  id: string
  name: string
  icon: string | null
  color: string | null
}

export function useSeasons() {
  const tenantId = useAuthStore((s) => s.tenantId())
  const [seasons, setSeasons] = useState<Season[]>([])

  useEffect(() => {
    if (!tenantId) return

    supabase
      .from('seasons')
      .select('id, name, icon, color')
      .eq('tenant_id', tenantId)
      .eq('active', true)
      .order('name')
      .then(({ data }) => setSeasons(data ?? []))
  }, [tenantId])

  return { seasons }
}