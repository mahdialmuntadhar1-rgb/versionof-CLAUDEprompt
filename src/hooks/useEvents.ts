import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Event } from '../types/database'
export function useEvents() {
  const [data, setData] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('events').select('*')
        .gte('date', new Date().toISOString())
      if (error) setError(error.message)
      else setData(data || [])
      setLoading(false)
    }
    load()
  }, [])
  return { data, loading, error }
}
