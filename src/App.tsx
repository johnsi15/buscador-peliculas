import responseMovies from './mocks/with-results.json'
import responseNoMovies from './mocks/no-results.json'
import './App.css'

function App() {
  const movies = responseMovies.Search
  const hasMovies = movies.length > 0

  return (
    <>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form'>
          <input type='text' placeholder='Avengers, The Matrix, Star Wars...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        {!hasMovies && <p>No se encontraron películas para esta búsqueda.</p>}

        {hasMovies && (
          <ul>
            {movies.map(movie => (
              <li key={movie.imdbID}>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <img src={movie.Poster} alt={movie.Title} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}

export default App
