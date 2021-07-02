export type SongType = {
  albumCover: string
  artist: string
  name: string
}

export type PlaylistType = {
  id: string
  title: string
  songs: SongType[]
}

export type SongItemType = {
  album: {
    images: {
      url: string
    }[]
  }
  artists: {
    name: string
  }[]
  name: string
  duration_ms: number
}

export type CurrentSongDataType = {
  item: SongItemType
  is_playing: boolean
  progress_ms: number
}
