import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { City } from '../types/database'
export function useCities() {
  const [data, setData] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase.from('cities').select('*')
      if (error) setError(error.message)
      else setData(data || [])
      setLoading(false)
    }
    fetch()
  }, [])
  return { data, loading, error }
}
