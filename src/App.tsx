import { FormEventHandler, useState, ChangeEventHandler, useCallback } from 'react'
import debounce from 'just-debounce-it'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import './App.css'

function App() {
  const { search, updateSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { movies, getMovies, loading, handleMoreMovies } = useMovies({ search, sort })

  console.log({ movies })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      // console.log({ search })
      getMovies({ search })
    }, 300),
    [getMovies]
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()

    // const fields = Object.fromEntries(new FormData(event.currentTarget)) // Forma NO controlada
    // console.log(fields)

    // console.log({ search })
    getMovies({ search })
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target

    updateSearch(value)
    debouncedGetMovies(value)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit} aria-label='Buscar películas'>
          <input
            style={{ border: error ? '1px solid red' : 'none' }}
            onChange={handleChange}
            value={search}
            type='text'
            name='query'
            placeholder='Avengers, The Matrix, Star Wars...'
          />
          <label htmlFor='order'>
            Ordenar
            <input id='order' type='checkbox' name='sort' onChange={handleSort} checked={sort} />
          </label>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>
      <main>
        {movies && <Movies movies={movies} />}
        {loading && <p>Cargando...</p>}
        {!loading && movies && movies?.length > 0 && <button onClick={handleMoreMovies}>Cargar más resultados</button>}
      </main>
    </>
  )
}

export default App
