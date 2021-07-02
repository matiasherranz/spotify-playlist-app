import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import NowPlaying from '../../components/NowPlaying'

const mockSong = {
  item: {
    album: {
      images: [
        {
          url: 'http://asdf.com',
        },
      ],
    },
    artists: [
      {
        name: 'Some artist',
      },
    ],
    name: 'Song name',
    duration_ms: 456,
  },
  is_playing: true,
  progress_ms: 654654,
}

describe('NowPlaying', () => {
  it('NowPlaying - renders without crashing', () => {
    render(
      <NowPlaying
        token="asdf"
        currentSong={mockSong}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setCurrentSong={() => {}}
      />
    )
    expect(screen.getByRole('nowPlaying')).toBeInTheDocument()
    expect(screen.getByRole('waiting')).toBeInTheDocument()
  })
})
