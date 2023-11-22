import React from 'react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import App from '../src/App'

describe('<App />', () => {
  beforeEach(() => {
    render(<App />)
  })

  afterEach(() => {
    cleanup()
  })

  test('should work', () => {
    const { getByText } = screen

    expect(getByText(/Buscador de películas/i)).toBeDefined()
  })

  test('should search and found movie', async () => {
    const user = userEvent.setup()

    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()

    const form = screen.getByRole('form')
    expect(form).toBeDefined()

    const button = form.querySelector('button')
    expect(button).toBeDefined()

    const MOVIE_TEXT = 'Avengers'

    await user.type(input, MOVIE_TEXT)
    await user.click(button!)

    await waitFor(() => {
      const list = screen.getByRole('list')
      expect(list).toBeDefined()
      expect(list.childNodes.length).toBeGreaterThan(1)
    })

    await user.type(input, 'nothingmovie')
    await user.click(button!)

    await waitFor(() => {
      screen.getByText('No se encontraron películas para esta búsqueda.')
    })
  })
})
