import { generateHash } from '.'

type SongType = {
  cover: string
  artist: string
  title: string
}

type PlaylistType = {
  id: string
  title: string
  songs: SongType[]
}

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
