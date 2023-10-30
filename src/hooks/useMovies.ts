import { useState } from 'react'
import { type Movie } from '../types'
import { searchMovies } from '../services/movies'

export function useMovies({ search }: { search: string }) {
  const [movies, setMovies] = useState<Movie[] | undefined>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getMovies = async () => {
    try {
      setLoading(true)
      setError(null)
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

  return { movies, getMovies, error }
}
