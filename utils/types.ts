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

export type ApiSongType = {
  item: {
    album: {
      images: {
        url: string
      }[]
    }
    artists: {
      name: string
    }[]
    name: string
  }
}
