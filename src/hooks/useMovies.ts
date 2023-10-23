import { useState } from 'react'
import responseNoMovies from '../mocks/no-results.json'
// import moviesResults from '../mocks/with-results.json'
import { type Movie, Type, ResponseErrorMovie } from '../types'

export function useMovies({ search }: { search: string }) {
  const [responseMovies, setResponseMovies] = useState<Movie[] | ResponseErrorMovie>([])
  // const movies = moviesResults.Search

  interface Movies {
    imdbID: string
    Title: string
    Year: string
    Type: string
    Poster: string
  }

  const mappedMovies = ({ movies }: { movies: Movies[] }) => {
    return movies.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      type: movie.Type as Type,
      poster: movie.Poster,
    }))
  }

  const getMovies = () => {
    if (search) {
      // setResponseMovies(mappedMovies)
      fetch(`https://www.omdbapi.com/?apikey=c2feec24&s=${search}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          }

          return res.json()
        })
        .then(data => {
          if (data.Response === 'True') {
            const movies = mappedMovies({ movies: data.Search })
            setResponseMovies(movies)
          } else {
            setResponseMovies(data)
          }
        })
        .catch(error => {
          console.log('algo salio mal :(', error)
        })
    } else {
      setResponseMovies(responseNoMovies)
    }
  }

  return { movies: responseMovies, getMovies }
}
