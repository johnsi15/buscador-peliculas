import React from 'react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('<App />', () => {
  // test('should work', () => {
  //   const { getByText } = render(<App />)

  //   expect(getByText(/Buscador de películas/i)).toBeDefined()
  // })

  test('should search movie', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Avengers, The Matrix, Star Wars...')
    expect(input).toBeDefined()

    const form = screen.getByRole('form')
    expect(form).toBeDefined()

    const button = form.querySelector('button')
    expect(button).toBeDefined()

    const MOVIE_TEXT = 'Avengers'

    await user.type(input, MOVIE_TEXT)
    await user.click(button!)
  })
})
