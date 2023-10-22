import { useState } from 'react'
import responseNoMovies from '../mocks/no-results.json'
import moviesResults from '../mocks/with-results.json'
import { type Movie, Type } from '../types'

export function useMovies({ search }) {
  const [responseMovies, setResponseMovies] = useState()
  const movies = moviesResults.Search

  const mappedMovies: Movie[] = movies.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    type: movie.Type as Type,
    poster: movie.Poster,
  }))

  const getMovies = () => {
    if (search) {
      setResponseMovies(moviesResults)
    } else {
      setResponseMovies(responseNoMovies)
    }
  }

  return { movies: mappedMovies, getMovies }
}
