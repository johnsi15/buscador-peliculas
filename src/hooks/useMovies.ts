import { useState } from 'react'
import responseNoMovies from '../mocks/no-results.json'
// import moviesResults from '../mocks/with-results.json'
import { type Movie, MovieApi, Type, ApiResponse } from '../types'

function request<Response>(url: string, config: RequestInit = {}): Promise<Response> {
  return fetch(url, config)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    })
    .then(data => data as Response)
}

export function useMovies({ search }: { search: string }) {
  const [responseMovies, setResponseMovies] = useState<Movie[] | ApiResponse>([])
  // const movies = moviesResults.Search

  const mappedMovies = ({ movies }: { movies: MovieApi[] }) => {
    return movies.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      type: movie.Type as Type,
      poster: movie.Poster,
    }))
  }

  const getMovies = async () => {
    if (search) {
      // setResponseMovies(mappedMovies)
      const data = await request<ApiResponse>(`https://www.omdbapi.com/?apikey=c2feec24&s=${search}`)

      if (data.Search && data.Response === 'True') {
        const movies = mappedMovies({ movies: data.Search })
        setResponseMovies(movies)
      } else {
        setResponseMovies(data)
      }
    } else {
      setResponseMovies(responseNoMovies)
    }
  }

  return { movies: responseMovies, getMovies }
}
