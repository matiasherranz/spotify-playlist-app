import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Sidebar from '../../components/Sidebar'
import { PlaylistType, SongType } from '../../utils/types'

const mockSong: SongType = {
  albumCover: 'http://image.com/',
  artist: 'Some artist',
  name: 'Name!',
}

const mockPlaylist1: PlaylistType = {
  id: 'asdfasdf1',
  title: 'title for the playlist',
  songs: [mockSong],
}

const mockPlaylist2: PlaylistType = {
  id: 'asdfasdf2',
  title: 'title for the playlist',
  songs: [mockSong],
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

describe('Sidebar', () => {
  it('Sidebar - renders without crashing', () => {
    render(
      <Sidebar
        playlists={[mockPlaylist1, mockPlaylist2]}
        selectPlaylist={noop}
        selectedPlaylist="asdfasdf2"
        addSongToPlaylist={noop}
        token="aasdfasdf"
      />
    )
    expect(
      screen.getAllByRole('heading', { name: 'title for the playlist' })
    ).toHaveLength(2)

    expect(
      screen.getByRole('link', { name: 'Add playlist' })
    ).toBeInTheDocument()

    expect(screen.getByRole('nowPlaying')).toBeInTheDocument()
  })
})
