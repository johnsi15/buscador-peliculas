import { ApiResponse, Type } from '../types'
function request<Response>(url: string, config: RequestInit = {}): Promise<Response> {
  return fetch(url, config)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    })
    .then(data => data as Response)
}

export async function searchMovies({ search, currentPage = 1 }: { search: string; currentPage: number }) {
  if (search === '') null

  try {
    const movies = await request<ApiResponse>(
      `https://www.omdbapi.com/?apikey=c2feec24&s=${search}&page=${currentPage}`
    )

    if (movies.Response === 'True') {
      return movies.Search?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        type: movie.Type as Type,
        poster: movie.Poster,
      }))
    }

    return []
  } catch (error) {
    throw new Error('Error searching movies')
  }
}
