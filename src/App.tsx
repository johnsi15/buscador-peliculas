// import responseNoMovies from './mocks/no-results.json'
import responseMovies from './mocks/with-results.json'
import './App.css'
import { Movies } from './components/Movies'
import { type Movie } from './types'

function App() {
  const movies: Movie[] = responseMovies.Search

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
        <Movies movies={movies} />
      </main>
    </>
  )
}

export default App
