import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import { render } from './testUtils'

import CategorySelect from '../components/CategorySelect'
jest.mock('next/dist/client/router', () => require('next-router-mock'));
describe('CategorySelect', () => {
  it('handles clicks', () => {
    const onCategoryToggle = jest.fn()
    render(<CategorySelect
      availableCategories={['c1', 'c2', 'c3']}
      selectedCategories={[]}
      onCategoryToggle={onCategoryToggle}
    />)
    const c1Button = screen.getByText("c1")
    fireEvent.click(c1Button)
    expect(onCategoryToggle).toHaveBeenCalledWith('c1')
  })
})