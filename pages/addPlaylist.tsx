import { useEffect, useState } from 'react'

import Head from 'next/head'
import Router from 'next/router'
import { useRouter } from 'next/router'

import { getUrlParams } from '../utils/index'

export const AddPlaylist = (): JSX.Element => {
  const router = useRouter()
  console.log('router.query.first: ', router.query.first)
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

          <form>
            <div className="controls">
              <input
                type="text"
                id="id"
                name="id"
                placeholder="Give your new playlist a title!"
              />

              <input type="reset" value="Clear" />
              <input type="submit" value="Save!" />
            </div>
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
          width: 50%;
          height: 50vh;
        }

        .output {
          font: 1rem 'Fira Sans', sans-serif;
        }

        .controls {
          padding-top: 1rem;
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          grid-template-columns: 1fr 2fr;
          gap: 0.7rem;
        }

        label {
          font-size: 0.8rem;
          justify-self: end;
        }

        input[type='reset'],
        input[type='submit'] {
          width: 5rem;
          justify-self: end;
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
