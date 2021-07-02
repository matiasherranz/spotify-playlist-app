import { generateHash } from '../utils'
import { PlaylistType } from '../utils/types'

const defaultPlaylistTitle = 'Select a playlist on the left to see its songs 3!'

interface IPlaylistDetail {
  playlist: PlaylistType
  removeSong: (id: number) => void
  removePlaylist: (id: string) => void
}

const PlaylistDetail = ({
  playlist,
  removeSong,
  removePlaylist,
}: IPlaylistDetail): JSX.Element => {
  if (!playlist) return null

  return (
    <div className="playlist-detail">
      <div className="content">
        <h1>Title: {playlist ? playlist.title : defaultPlaylistTitle}</h1>
        <div
          className="removePlaylist"
          onClick={() => removePlaylist(playlist.id)}
        >
          ❌ Remove playlist
        </div>
        <h1>Songs:</h1>
        {!playlist.songs.length && (
          <p>This playlist has no songs yet! Why not adding some? ➕ 📻 😃 </p>
        )}

        {playlist.songs.map((song, index) => {
          return (
            // Create a random id to let the user repeat the song
            <div className="song" key={generateHash(6)}>
              <div className="song-cover">
                <img src={song.albumCover} />
              </div>
              <div className="song-info">
                <div className="song-name">{song.name}</div>
                <div className="song-artist">{song.artist}</div>
                <div className="removeSong" onClick={() => removeSong(index)}>
                  {' '}
                  ❌ Remove song{' '}
                </div>
              </div>
              <div
                className="background"
                style={{ backgroundImage: `url(${song.albumCover})` }}
              />
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .playlist-detail {
          margin-top: 15px;
          margin-left: 25px;
        }

        .content {
          float: right;
          width: 69%;
          border-radius: 4px;
          padding: 10px;
          background-color: #d9e4e2c9;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          min-height: 650px;
        }

        .removeSong {
          cursor: pointer;
        }

        .song {
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

        .song-cover {
          float: left;
          margin-right: 15px;
          margin-top: 10px;
          margin-left: 5px;
          margin-bottom: 5px;
          text-align: right;
          width: 30%;
        }

        .song-cover img {
          max-width: 80vmin;
          width: 100%;
          border-radius: 10px;
        }

        .song-info {
          width: 45%;
        }

        .song-name {
          font-size: 1em;
          margin-bottom: 5px;
          margin-top: 5px;
          font-weight: bold;
        }

        .song-artist {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  )
}

export default PlaylistDetail
