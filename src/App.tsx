// import responseNoMovies from './mocks/no-results.json'
import responseMovies from './mocks/with-results.json'
import './App.css'
import { Movies } from './components/Movies'
import { type Movie, Type } from './types'

function App() {
  const movies = responseMovies.Search

  const mappedMovies: Movie[] = movies.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    type: movie.Type as Type,
    poster: movie.Poster,
  }))

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
        <Movies movies={mappedMovies} />
      </main>
    </>
  )
}

export default App
