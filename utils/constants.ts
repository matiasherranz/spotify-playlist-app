// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = '5f93f2ea4e3d4202be9e97a1ba37d3c5'
export const redirectUri = 'http://localhost:3000/'
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
