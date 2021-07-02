import { SyntheticEvent, useState } from 'react'

import Head from 'next/head'
import Router from 'next/router'
import { useRouter } from 'next/router'
import { addNewPlaylist } from '../utils/sessionStorage'

export const AddPlaylist = (): JSX.Element => {
  const [formTitle, setFormTitle] = useState('')
  const router = useRouter()

  const handleSave = (event: SyntheticEvent): void => {
    event.preventDefault()
    addNewPlaylist(formTitle)
    Router.push('/dashboard')
  }

  return (
    <div>
      <Head>
        <title>Spotify Playlist App | Create a New Playlist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <div className="content">
          <h1>
            {router.query.first
              ? 'Create your first playlist! Just give it a cool title'
              : 'Give your new playlist an awesome title :-)'}
          </h1>

          <form onSubmit={handleSave}>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="Give your new playlist a title! (of at least 4 characters)"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />

            <input type="reset" value="Clear" />
            <input
              type="button"
              value="Cancel"
              onClick={() => Router.push('/dashboard')}
            />
            <input
              type="submit"
              value="Save!"
              disabled={!formTitle || !(formTitle.length > 4)}
            />
          </form>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          padding: 0;
          background: rgb(124, 188, 92);
          background: linear-gradient(
            300deg,
            rgba(124, 188, 92, 0.5536589635854341) 9%,
            rgba(173, 210, 166, 0.335171568627451) 63%,
            rgba(211, 228, 196, 0.4108018207282913) 77%
          );
        }

        .content {
          position: absolute;
          top: 20%;
          width: 55%;
          height: 50vh;
        }

        .output {
          font: 1rem 'Fira Sans', sans-serif;
        }

        label {
          font-size: 0.8rem;
          justify-self: end;
        }

        input[type='text'] {
          padding: 10px;
          margin: 10px 0; /* Top and bottom margin */
          box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
          width: 100%;
        }

        input[type='reset'],
        input[type='button'],
        input[type='submit'] {
          width: 5rem;
          justify-self: end;
          padding: 10px;
          margin: 10px 0; /* Top and bottom margin */
        }

        input[type='button'] {
          margin: 10px 10px 0 5px; /* Top and bottom margin */
        }

        input[type='submit'] {
          margin: 10px 10px 0 10px; /* Top and bottom margin */
        }

        input[type='reset'] {
          grid-column: 2;
          grid-row: 2;
        }

        input[type='submit'] {
          grid-column: 2;
          grid-row: 3;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default AddPlaylist
