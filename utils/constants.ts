// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = process.env.CLIENT_ID
export const redirectUri = process.env.REDIRECT_URI
export const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
]

export const SPOTIFY_AUTH_BASE_URL = 'https://accounts.spotify.com/authorize'

const scopesStr = scopes.join('%20')
export const SPOTIFY_AUTH_URL = `${SPOTIFY_AUTH_BASE_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopesStr}&response_type=token&show_dialog=true`
