import Router from 'next/router'

import { useEffect, useState } from 'react'
import { getCurrentlyPlaying } from '../utils/spotifyApi'
import { POLLING_INTERVAL } from '../utils/constants'

interface INowPlaying {
  token: string
}

const NowPlaying = ({ token }: INowPlaying): JSX.Element => {
  const [timeoutHandler, setTimeoutHandler] = useState()
  const [currentSong, setCurrentSong] = useState()

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
        setCurrentSong(song)
      } catch (e) {
        // Token expired. Let's take the user to the login screen
        console.error(e)
        Router.push('/')
      }
    }
  }

  if (!currentSong) {
    return null
  }
  const song = currentSong.item

  const backgroundStyles = {
    backgroundImage: currentSong ? `url(${song.album.images[0].url})` : '',
  }

  const progressBarStyles = {
    width: currentSong
      ? (currentSong.progress_ms * 100) / song.duration_ms + '%'
      : '0%',
  }

  return (
    <div className="now-playing">
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

      <style jsx>{`
        .now-playing {
          align-items: center;
          display: flex;
          height: 100%;
          margin: 0 auto;
          justify-content: center;
          position: relative;
          width: 80%;
          z-index: 1;
        }

        .now-playing-name {
          font-size: 1.2em;
          margin-bottom: 0.2em;
        }

        .now-playing-artist {
          margin-bottom: 1em;
        }

        .now-playing-status {
          margin-bottom: 1em;
        }

        .now-playing-cover {
          float: left;
          margin-right: 10px;
          text-align: right;
          width: 45%;
        }

        .now-playing-cover img {
          max-width: 80vmin;
          width: 100%;
        }

        .now-playing-info {
          margin-left: 5%;
          width: 45%;
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
