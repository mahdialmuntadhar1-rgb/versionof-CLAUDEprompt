import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Business } from '../types/database'
export function useBusinesses(cityId?: string, categoryId?: string) {
  const [data, setData] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    async function load() {
      setLoading(true)
      let q = supabase.from('businesses').select('*')
      if (cityId) q = q.eq('city_id', cityId)
      if (categoryId) q = q.eq('category_id', categoryId)
      const { data, error } = await q
      if (error) setError(error.message)
      else setData(data || [])
      setLoading(false)
    }
    load()
  }, [cityId, categoryId])
  return { data, loading, error }
}
