import { useState } from 'react'
import responseNoMovies from '../mocks/no-results.json'
import moviesResults from '../mocks/with-results.json'
import { type Movie, Type } from '../types'

export function useMovies({ search }: { search: string }) {
  const [responseMovies, setResponseMovies] = useState<Movie[] | { Response: string; Error: string }>()
  const movies = moviesResults.Search

  console.log({ responseMovies })

  const mappedMovies: Movie[] = movies.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    type: movie.Type as Type,
    poster: movie.Poster,
  }))

  const getMovies = () => {
    if (search) {
      setResponseMovies(mappedMovies)
    } else {
      setResponseMovies(responseNoMovies)
    }
  }

  return { movies: mappedMovies, getMovies }
}
