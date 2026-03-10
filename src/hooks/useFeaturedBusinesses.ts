import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Business } from '../types/database'
export function useFeaturedBusinesses() {
  const [data, setData] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase.from('businesses').select('*').eq('top_rated', true).limit(10)
      if (error) setError(error.message)
      else setData(data || [])
      setLoading(false)
    }
    fetch()
  }, [])
  return { data, loading, error }
}
