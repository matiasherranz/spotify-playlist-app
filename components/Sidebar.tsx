import { useState } from 'react'

import NowPlaying from './NowPlaying'
import { PlaylistsDataType } from '../utils/sessionStorage'
import { CurrentSongDataType } from '../utils/types'

interface ISidebar {
  playlists: PlaylistsDataType
  selectPlaylist: (id: string) => void
  addSongToPlaylist: (song: CurrentSongDataType, playlist: string) => void
  selectedPlaylist: string
  token: string
}

const Sidebar = ({
  playlists,
  selectPlaylist,
  selectedPlaylist,
  addSongToPlaylist,
  token,
}: ISidebar): JSX.Element => {
  if (!playlists) return null

  const [currentSong, setCurrentSong] = useState<CurrentSongDataType>()

  return (
    <div className="sidebar">
      <article role="main">
        <aside>
          <div className="playlists">
            {playlists.map((pl) => {
              return (
                <div
                  key={pl.id}
                  className={`card ${
                    selectedPlaylist === pl.id ? 'selected' : ''
                  }`}
                  onClick={() => selectPlaylist(pl.id)}
                >
                  <h3>{pl.title}</h3>
                </div>
              )
            })}
          </div>

          <div className="info-card">
            <p className="info-card-text">
              💡 Click a playlist above to see the songs it has. You can also
              add it new ones!
            </p>
          </div>

          <div className="card-no-border">
            <a className="btn" href="/addPlaylist">
              Add playlist
            </a>
          </div>

          <NowPlaying
            token={token}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
          />

          <div className="info-card">
            <p className="info-card-text">
              💡 Click the &quot;Add Song&quot; button below to add the current
              song to the selected playlist.
            </p>
          </div>

          <div
            className="card-no-border"
            onClick={() => addSongToPlaylist(currentSong, selectedPlaylist)}
          >
            <a className="btn">Add song</a>
          </div>
        </aside>
      </article>

      <style jsx>{`
        .playlists {
          max-height: 50vh;
          overflow: scroll;
          -ms-overflow-style: none; /* for Internet Explorer, Edge */
          scrollbar-width: none; /* for Firefox */
          overflow-y: scroll;
        }

        .playlists::-webkit-scrollbar {
          display: none; /* for Chrome, Safari, and Opera */
        }

        div.removePlaylist {
          cursor: pointer;
          font-size: 14px;
          position: relative;
          width: fit-content;
        }

        .btn {
          background-color: transparent;
          border-radius: 2em;
          border: 0.2em solid #1ecd97;
          color: #1ecd97;
          cursor: pointer;
          font-size: 16px;
          padding: 0.7em 1.5em;
          text-transform: uppercase;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .btn:hover {
          background: #1ecd97;
          color: #333;
        }

        aside {
          float: left;
          width: 30%;
          border-radius: 4px;
          padding: 10px;
        }

        .card-no-border {
          flex-basis: 80%;
          padding-bottom: 10px;
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease, border-color 0.15s ease;
          display: flex;
          justify-content: center;
        }

        .info-card {
          margin-top: 10px;
          margin-bottom: 10px;
          flex-basis: 80%;
          padding: 7px;
          text-decoration: none;
          border: 1px solid #7b8898;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .info-card-text {
          text-align: center;
          vertical-align: middle;
          display: table-cell;
        }

        .card {
          margin-top: 5px
          margin-bottom: 5px;
          display: flex;
          justify-content: center;

          flex-basis: 80%;
          padding: 10px;

          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card.selected {
          color: #00aef3;
          border-color: #0070f361;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 18px;
          max-width: 90%;
          text-overflow: ellipsis;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  )
}

export default Sidebar
