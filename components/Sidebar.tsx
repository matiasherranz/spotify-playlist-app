import { PlaylistsDataType } from '../utils/sessionStorage'

interface ISidebar {
  playlists: PlaylistsDataType
  removePlaylist: () => void
}

const Sidebar = ({ playlists, removePlaylist }: ISidebar): JSX.Element => {
  if (!playlists) return null
  return (
    <div className="sidebar">
      <main>
        <div className="grid">
          {playlists.map((pl) => {
            return (
              <a key={pl.id} href="" className="card">
                <h3>{pl.title}</h3>
                <p>This playlist has {pl.songs.length} songs</p>
              </a>
            )
          })}
        </div>
      </main>

      <style jsx>{`
        .sidebar {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 25%;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 350px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
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

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default Sidebar
