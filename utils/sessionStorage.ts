import { generateHash } from '.'
import { CurrentSongDataType, PlaylistType } from './types'

export type PlaylistsDataType = PlaylistType[]

// Saves into localStorage under the provided id
export const saveToStorage = (id: string, data: PlaylistsDataType): void => {
  localStorage.setItem(id, JSON.stringify(data))
}

// Retrieves from storage using the provided id
export const getFromStorage = (id: string): PlaylistsDataType | null => {
  const retrievedObject = localStorage.getItem(id)
  if (!retrievedObject) return null

  return JSON.parse(retrievedObject)
}

export const addNewPlaylist = (title: string): void => {
  const emptyPlaylist: PlaylistsDataType = []
  const playlists = getFromStorage('playlists') ?? emptyPlaylist

  playlists.push({ title, songs: [], id: generateHash() })
  saveToStorage('playlists', playlists)
}

export const addSongToPlaylist = (
  playlistId: string,
  song: CurrentSongDataType
): PlaylistType[] => {
  const playlists = getFromStorage('playlists')

  playlists.forEach((pl: PlaylistType) => {
    if (pl.id === playlistId) {
      pl.songs.push({
        albumCover: song.item.album.images[0].url,
        artist: song.item.artists[0].name,
        name: song.item.name,
      })
    }
  })
  saveToStorage('playlists', playlists)
  return playlists
}

export const removePlaylist = (id: string): PlaylistType[] => {
  const playlists = getFromStorage('playlists')
  const filtered = playlists.filter((pl) => pl.id !== id)

  saveToStorage('playlists', filtered)
  return filtered
}

export const removeSongfromPlaylist = (
  playlistId: string,
  index: number
): PlaylistType[] => {
  const playlists = getFromStorage('playlists')
  playlists.map((pl) => {
    if (pl.id === playlistId) {
      pl.songs.splice(index, 1)
    }
  })
  saveToStorage('playlists', playlists)
  return playlists
}
