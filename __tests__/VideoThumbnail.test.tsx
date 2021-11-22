import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import { render } from './testUtils'

import VideoThumbnail from '../components/VideoThumbnail'
jest.mock('next/dist/client/router', () => require('next-router-mock'));
describe('VideoThumbnail', () => {
  it('renders normally', () => {
    const onClick = jest.fn()
    render(<VideoThumbnail
      duration={180}
      title="Title"
      subTitle="SubTitle"
      thumbnailUrl="/url"
      variant="c1"
      onClick={onClick}
    />)
    const duration = screen.getByText("3min")
    expect(duration).toBeInTheDocument()
    fireEvent.click(duration)
    expect(onClick).toHaveBeenCalled()
  })
})