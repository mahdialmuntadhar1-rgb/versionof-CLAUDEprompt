import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Category } from '../types/database'
export function useCategories() {
  const [data, setData] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase.from('categories').select('*')
      if (error) setError(error.message)
      else setData(data || [])
      setLoading(false)
    }
    fetch()
  }, [])
  return { data, loading, error }
}
