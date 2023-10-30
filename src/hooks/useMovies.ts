import { useRef, useState } from 'react'
import { type Movie } from '../types'
import { searchMovies } from '../services/movies'

export function useMovies({ search }: { search: string }) {
  const [movies, setMovies] = useState<Movie[] | undefined>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const previousSearch = useRef(search)

  const getMovies = async () => {
    // Al ser la misma movie (search) al intentar buscar evitamos que se haga la búsqueda dos veces seguidas.
    // El useRef me guarda ese valor como referencia y no muta entre renderizados.
    if (previousSearch.current === search) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return { movies, getMovies, loading, error }
}
