import { useState, useRef, useEffect } from 'react'
export function useSearch() {
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

  const getUpdateSearch = ({ search }: { search: string }) => {
    updateSearch(search)
  }

  return { search, getUpdateSearch, error }
}
