import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './testUtils'

import Home from '../pages/index'
jest.mock('next/dist/client/router', () => require('next-router-mock'));
describe('Home', () => {
  it('renders normally', () => {
    render(<Home />)
    const heading = screen.getByText("Welcome to Gymondo*")
    expect(heading).toBeInTheDocument()
  })
})