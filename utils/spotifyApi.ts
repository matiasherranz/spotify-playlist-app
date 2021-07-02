import { SPOTIFY_PLAYER_URL } from './constants'
import { CurrentSongDataType } from '../utils/types'

async function getData(url = '', token = '') {
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    referrerPolicy: 'no-referrer',
  })

  // User is not playing on Spotify
  if (response.status === 204) return null

  // User is playing something
  return response.json()
}

export const getCurrentlyPlaying = async (
  token: string
): Promise<CurrentSongDataType | null> => {
  const data: CurrentSongDataType = await getData(SPOTIFY_PLAYER_URL, token)
  if (!data) return null

  return {
    item: data.item,
    is_playing: data.is_playing,
    progress_ms: data.progress_ms,
  }
}
