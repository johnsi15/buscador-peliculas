import { FormEventHandler, useState, ChangeEventHandler } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import './App.css'

function App() {
  const { movies } = useMovies()
  const [query, setQuery] = useState('') // Forma controlada
  const [error, setError] = useState<null | string>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()

    // const fields = Object.fromEntries(new FormData(event.currentTarget)) // Forma NO controlada
    // console.log(fields)

    console.log({ query })
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target

    if (value.startsWith(' ')) return

    setQuery(value)

    if (value === '') {
      setError('No se pueden buscar peliculas vacias')
      return
    }

    if (value.match(/^\d+$/)) {
      setError('No se pueden buscar peliculas con un numero')
      return
    }

    if (value.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }

  return (
    <>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{ border: error ? '1px solid red' : 'none' }}
            onChange={handleChange}
            value={query}
            type='text'
            name='query'
            placeholder='Avengers, The Matrix, Star Wars...'
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </>
  )
}

export default App
