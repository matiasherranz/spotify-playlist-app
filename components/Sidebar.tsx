import NowPlaying from './NowPlaying'
import { PlaylistsDataType } from '../utils/sessionStorage'

interface ISidebar {
  playlists: PlaylistsDataType
  removePlaylist: (id: string) => void
  token: string
}

const Sidebar = ({
  playlists,
  removePlaylist,
  token,
}: ISidebar): JSX.Element => {
  if (!playlists) return null
  return (
    <div className="sidebar">
      <article role="main">
        <aside>
          <p className="sidebarTitle">
            Select a playlist to see its songs add the song current playing to
          </p>
          {playlists.map((pl) => {
            return (
              <div key={pl.id} className="card">
                <h3>{pl.title}</h3>
                <p>This playlist has {pl.songs.length} songs</p>
              </div>
            )
          })}

          <div className="card-no-border">
            <a className="btn" href="/addPlaylist">
              Create new playlist
            </a>
          </div>

          <NowPlaying token={token} />
        </aside>
      </article>

      <style jsx>{`
        .sidebar {
        }

        .btn {
          background-color: transparent;
          border-radius: 2em;
          border: 0.2em solid #1ecd97;
          color: #1ecd97;
          cursor: pointer;
          font-size: 2vmin;
          padding: 0.7em 1.5em;
          text-transform: uppercase;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .btn:hover {
          background: #1ecd97;
          color: #333;
        }

        .sidebarTitle {
          text-align: center;
          vertical-align: middle;
          display: table-cell;
        }

        aside {
          float: left;
          width: 30%;
          border-radius: 4px;
          padding: 10px;
        }

        .card-no-border {
          margin-top: 1rem;
          margin-bottom: 1rem;
          margin-left: 20px;
          flex-basis: 80%;
          padding: 1.2rem;
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card {
          margin-top: 1rem;
          margin-bottom: 1rem;
          flex-basis: 80%;
          padding: 1.2rem;
          text-align: left;
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

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
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
