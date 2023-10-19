// import responseNoMovies from './mocks/no-results.json'
import responseMovies from '../mocks/with-results.json'
import { type Movie, Type } from '../types'

export function useMovies() {
  const movies = responseMovies.Search

  const mappedMovies: Movie[] = movies.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    type: movie.Type as Type,
    poster: movie.Poster,
  }))

  return { movies: mappedMovies }
}
