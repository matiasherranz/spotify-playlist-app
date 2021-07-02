import Router from 'next/router'

import { useEffect, useState } from 'react'
import { getCurrentlyPlaying } from '../utils/spotifyApi'
import { POLLING_INTERVAL } from '../utils/constants'
import { deleteCookie } from '../utils/cookieStorage'
import { ApiSongType, SongType } from '../utils/types'

interface INowPlaying {
  token: string
  currentSong: SongType
  setCurrentSong: (song) => void
}

const NowPlaying = ({
  token,
  currentSong,
  setCurrentSong,
}: INowPlaying): JSX.Element => {
  const [timeoutHandler, setTimeoutHandler] = useState()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Set polling interval and start polling
    const handler = setInterval(() => tick(), POLLING_INTERVAL)
    setTimeoutHandler(handler)

    // Return interval cleanup function
    return () => clearInterval(timeoutHandler)
  }, [])

  const tick = async () => {
    if (token) {
      try {
        const song = await getCurrentlyPlaying(token)
        if (!song) {
          setIsPlaying(false)
        } else {
          setIsPlaying(true)
          setCurrentSong(song)
        }
      } catch (e) {
        console.error(e)

        // Token expired. Let's remove the cookie and take the
        // user to the login screen
        deleteCookie('token')
        Router.push('/')
      }
    }
  }

  let song = {}
  let backgroundStyles = {}
  let progressBarStyles = {}
  if (currentSong) {
    song = currentSong.item
    backgroundStyles = {
      backgroundImage: currentSong ? `url(${song.album.images[0].url})` : '',
    }
    progressBarStyles = {
      width: currentSong
        ? (currentSong.progress_ms * 100) / song.duration_ms + '%'
        : '0%',
    }
  }

  return (
    <div className="now-playing">
      {/* User is not playing anything on Spotify */}
      {!currentSong && (
        <div className="not-playing-msg">
          <div className="now-playing-name">Loading...</div>
          <div className="now-playing-artist">
            Looking for the song you are playing on Spotify. Hang tight! :-)
          </div>
        </div>
      )}

      {/* User is playing a song */}
      {currentSong && isPlaying && (
        <>
          <div className="now-playing-cover">
            <img src={song.album.images[0].url} />
          </div>
          <div className="now-playing-info">
            <div className="now-playing-name">{song.name}</div>
            <div className="now-playing-artist">{song.artists[0].name}</div>
            <div className="now-playing-status">
              {currentSong.is_playing ? '▶️ Playing' : '⏸ Paused'}
            </div>
            <div className="progress">
              <div className="progress-bar" style={progressBarStyles} />
            </div>
          </div>
          <div className="background" style={backgroundStyles} />
        </>
      )}

      {/* User was playing a song and paused it */}
      {currentSong && !isPlaying && (
        <>
          <div className="not-playing-msg">
            <div className="now-playing-name">Go play music on Spotify!</div>
            <div className="now-playing-artist">
              Go to Spotify, play something and it will show up here :-)
            </div>
          </div>
        </>
      )}
      <style jsx>{`
        .now-playing {
          align-items: center;
          display: flex;
          height: 100%;
          margin: 0 auto;
          justify-content: center;
          position: relative;
          width: 100%;
          z-index: 1;
          border: 2px solid #eaeaea;
          border-radius: 10px;
        }

        .now-playing-name {
          font-size: 1em;
          margin-bottom: 5px;
          margin-top: 5px;
          font-weight: bold;
        }

        .now-playing-artist {
          margin-bottom: 10px;
        }

        .now-playing-status {
          margin-bottom: 5px;
        }

        .now-playing-cover {
          float: left;
          margin-right: 15px;
          margin-top: 10px;
          margin-left: 5px;
          margin-bottom: 5px;
          text-align: right;
          width: 45%;
        }

        .now-playing-cover img {
          max-width: 80vmin;
          width: 100%;
          border-radius: 10px;
        }

        .now-playing-info {
          width: 45%;
        }

        .not-playing-msg {
          width: 95%;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .progress {
          border: 1px solid #eee;
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar {
          background-color: #eee;
          height: 4px;
        }
      `}</style>
    </div>
  )
}

export default NowPlaying
