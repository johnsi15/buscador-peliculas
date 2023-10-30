import { FormEventHandler, useState, ChangeEventHandler, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import './App.css'

function useSearch() {
  const [search, updateSearch] = useState('') // Forma controlada
  const [error, setError] = useState<null | string>(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search.startsWith(' ')) return

    if (search === '') {
      setError('No se pueden buscar peliculas vacias')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se pueden buscar peliculas con un numero')
      return
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App() {
  const { search, updateSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { movies, getMovies, loading } = useMovies({ search, sort })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      console.log({ search })
      getMovies({ search })
    }, 300),
    [getMovies]
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()

    // const fields = Object.fromEntries(new FormData(event.currentTarget)) // Forma NO controlada
    // console.log(fields)

    console.log({ search })
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
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{ border: error ? '1px solid red' : 'none' }}
            onChange={handleChange}
            value={search}
            type='text'
            name='query'
            placeholder='Avengers, The Matrix, Star Wars...'
          />
          <input type='checkbox' name='sort' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </>
  )
}

export default App
