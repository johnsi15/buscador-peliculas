import { type Movie } from '../types'
function ListOfMovies({ movies }: { movies: Movie[] }) {
  return (
    <ul className='movies'>
      {movies.map(movie => (
        <li className='movie' key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
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
