export interface Search {
  Search: Movie[]
  totalResults: string
  Response: string
}

export interface Movie {
  title: string
  year: string
  id: string
  type: Type
  poster: string
}

export type Type = 'movie' | 'series'
