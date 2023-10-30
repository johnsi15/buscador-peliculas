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

export async function searchMovies({ search }: { search: string }) {
  if (search === '') null

  try {
    const movies = await request<ApiResponse>(`https://www.omdbapi.com/?apikey=c2feec24&s=${search}`)

    return movies.Search?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      type: movie.Type as Type,
      poster: movie.Poster,
    }))
  } catch (error) {
    throw new Error('Error searching movies')
  }
}
