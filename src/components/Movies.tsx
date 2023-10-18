import { type Movie } from '../types'
function ListOfMovies({ movies }: { movies: Movie[] }) {
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </li>
      ))}
    </ul>
  )
}

function NoMovies() {
  return <p>No se encontraron películas para esta búsqueda.</p>
}

export function Movies({ movies }: { movies: Movie[] }) {
  const hasMovies = movies.length > 0

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMovies />
}
