import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { type Movie } from '../types'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }: { search: string; sort: boolean }) {
  const [movies, setMovies] = useState<Movie[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const previousSearch = useRef(search)
  const previousPage = useRef(currentPage)

  // En este caso se uso el useMemo como ejemplo, pero solo se debe usar si estamos midiendo el rendimiento. -> Profiler extension de react
  // Se cambio de useMemo a useCallback, es casi lo mismo el useCallback por debajo usa useMemo la unica diferencia es simplificar la forma de implementar
  // Se recomienda user useCallback para funciones, y useMemo para calcular valores
  const getMovies = useCallback(
    async ({ search }: { search: string }) => {
      // Al ser la misma movie (search) al intentar buscar evitamos que se haga la búsqueda dos veces seguidas.
      // El useRef me guarda ese valor como referencia y no muta entre renderizados.
      if (previousSearch.current === search && currentPage === 1) return

      try {
        setLoading(true)
        setError(null)
        if (previousSearch.current !== search) {
          setCurrentPage(1) // revisar
        }

        previousSearch.current = search

        const newMovies = await searchMovies({ search, currentPage })

        if (search === '') {
          setMovies(undefined)
          setCurrentPage(1)
          return
        }

        if (previousPage.current !== currentPage && previousSearch.current === search) {
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
    },
    [currentPage]
  )

  useEffect(() => {
    getMovies({ search })
  }, [currentPage, search, getMovies])

  // const sortedMovies = movies && sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  // Evitamos cada vez que el search cambia vuelva a calcular el sort, cuando vale la pena ej: Cuando tenemos un array con 1.000 items
  const sortedMovies = useMemo(() => {
    console.log('memoSortedMovies')
    return movies && sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  }, [sort, movies])

  const handleMoreMovies = () => {
    setCurrentPage(currentPage + 1)
    console.log({ currentPage })
  }

  return { movies: sortedMovies, getMovies, loading, error, handleMoreMovies }
}
