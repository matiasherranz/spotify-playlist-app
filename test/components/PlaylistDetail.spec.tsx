import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import PlaylistDetail from '../../components/PlaylistDetail'
import { PlaylistType, SongType } from '../../utils/types'

const mockSong: SongType = {
  albumCover: 'http://image.com/',
  artist: 'Some artist',
  name: 'Name!',
}

const mockPlaylist: PlaylistType = {
  id: 'asdfasdf',
  title: 'title for the playlist',
  songs: [mockSong],
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

describe('PlaylistDetail', () => {
  it('PlaylistDetail - renders without crashing', () => {
    render(
      <PlaylistDetail
        playlist={mockPlaylist}
        removePlaylist={noop}
        removeSong={noop}
      />
    )
    expect(
      screen.getByRole('heading', { name: 'Title: title for the playlist' })
    ).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'Songs:' })).toBeInTheDocument()

    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
