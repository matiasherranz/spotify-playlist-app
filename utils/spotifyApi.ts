import { SPOTIFY_PLAYER_URL } from './constants'

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

type APIResponseType = {
  item: Record<string, unknown>
  is_playing: boolean
  progress_ms: number
}

export const getCurrentlyPlaying = async (token: string) => {
  const data: APIResponseType = await getData(SPOTIFY_PLAYER_URL, token)
  if (!data) return null

  return {
    item: data.item,
    is_playing: data.is_playing,
    progress_ms: data.progress_ms,
  }
}
