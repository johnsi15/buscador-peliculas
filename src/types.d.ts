export interface ApiResponse {
  Search?: MovieApi[]
  totalResults?: string
  Response: string
  Error?: string
}

export interface MovieApi {
  imdbID: string
  Title: string
  Year: string
  Type: string
  Poster: string
}

export interface Movie {
  title: string
  year: string
  id: string
  type: Type
  poster: string
}

export type Type = 'movie' | 'series'
