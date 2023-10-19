import { FormEventHandler, useState, ChangeEventHandler } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import './App.css'

function App() {
  const { movies } = useMovies()
  const [query, setQuery] = useState('') // Forma controlada

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()

    // const fields = Object.fromEntries(new FormData(event.currentTarget)) // Forma NO controlada
    // console.log(fields)

    console.log({ query })
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setQuery(event.target.value)
  }

  return (
    <>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={query}
            type='text'
            name='query'
            placeholder='Avengers, The Matrix, Star Wars...'
          />
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
