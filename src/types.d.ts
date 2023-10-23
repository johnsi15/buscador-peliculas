export interface Search {
  Search: Movies[]
  totalResults: string
  Response: string
}

export interface Movies {
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

export interface ResponseErrorMovie {
  Response: string
  Error: string
}

export type Type = 'movie' | 'series'
