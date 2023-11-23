import { useCallback, useMemo, useEffect, useRef, useState } from 'react'
import { type Movie } from '../types'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort, currentPage }: { search: string; sort: boolean; currentPage: number }) {
  const [movies, setMovies] = useState<Movie[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const previousSearch = useRef(search)
  const previousPage = useRef(currentPage)

  // En este caso se uso el useMemo como ejemplo, pero solo se debe usar si estamos midiendo el rendimiento. -> Profiler extension de react
  // Se cambio de useMemo a useCallback, es casi lo mismo el useCallback por debajo usa useMemo la unica diferencia es simplificar la forma de implementar
  // Se recomienda user useCallback para funciones, y useMemo para calcular valores
  const getMovies = useCallback(async ({ search, currentPage }: { search: string; currentPage: number }) => {
    // Al ser la misma movie (search) al intentar buscar evitamos que se haga la búsqueda dos veces seguidas.
    // El useRef me guarda ese valor como referencia y no muta entre renderizados.
    if (previousSearch.current === search && previousPage.current === currentPage) return

    try {
      setLoading(true)
      setError(null)

      console.log('render component')
      console.log({ currentPage })

      previousPage.current = currentPage

      if (previousSearch.current !== search) {
        console.log('paso por acá...')
        previousPage.current = 1
      }

      previousSearch.current = search

      if (search === '') {
        setMovies(undefined)
        return
      }

      const newMovies = await searchMovies({ search, currentPage: previousPage.current })

      console.log({ newMovies })

      if (previousPage.current > 1 && previousSearch.current === search) {
        setMovies(prevMovies => (prevMovies && newMovies ? prevMovies.concat(newMovies) : newMovies))
        return
      }

      setMovies(newMovies)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getMovies({ search, currentPage })
  }, [currentPage, search, getMovies])

  // const sortedMovies = movies && sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  // Evitamos cada vez que el search cambia vuelva a calcular el sort, cuando vale la pena ej: Cuando tenemos un array con 1.000 items
  const sortedMovies = useMemo(() => {
    console.log('memoSortedMovies')
    return movies && sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}
