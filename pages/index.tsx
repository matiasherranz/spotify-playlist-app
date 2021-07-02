import { useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'

import {
  SPOTIFY_AUTH_URL,
  SPOTIFY_TOKEN_EXPIRATION_HOURS,
} from '../utils/constants'
import { getUrlParams } from '../utils'
import { getCookie, setCookie } from '../utils/cookieStorage'

export const Home = (): JSX.Element => {
  useEffect(() => {
    let token = getCookie('token')
    const urlParams = getUrlParams()

    // Clean the URL bar to avoid displaying the access token to the user
    window.location.hash = ''

    if (!token && urlParams.access_token) {
      token = urlParams.access_token
      setCookie('token', token, SPOTIFY_TOKEN_EXPIRATION_HOURS)
    }

    if (token) {
      // User has a token (either from a cookie or url param),
      // let's take them to the app
      Router.push('/dashboard')
    }
  }, [])

  // User does not have a token, let's show them the landing / login button
  return (
    <div className="container">
      <Head>
        <title>Spotify Playlist App | Welcome!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to the{' '}
          <a
            href="https://open.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spotify
          </a>{' '}
          Playlist Playground!
        </h1>

        <p className="description">
          To get started, go ahead and login by clicking the button below.
        </p>

        <a className="btn" href={SPOTIFY_AUTH_URL}>
          Login to Spotify
        </a>
      </main>

      <footer>
        <a
          href="https://www.linkedin.com/in/matiasherranz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Matías Herranz, powered by
          <Image
            src="/nextjs.svg"
            alt="NextJS logo"
            height={'32'}
            width={'64'}
          />
          and ReactJS
          <div style={{ marginLeft: '4px' }}>
            <Image
              src="/react.svg"
              alt="NextJS logo"
              height={'26'}
              width={'26'}
            />
          </div>
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          background: rgb(124, 188, 92);
          background: linear-gradient(
            300deg,
            rgba(124, 188, 92, 0.5536589635854341) 9%,
            rgba(173, 210, 166, 0.335171568627451) 63%,
            rgba(211, 228, 196, 0.4108018207282913) 77%
          );
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        /** Buttons **/
        .btn {
          background-color: transparent;
          border-radius: 2em;
          border: 0.2em solid #1ecd97;
          color: #1ecd97;
          cursor: pointer;
          font-size: 3vmin;
          padding: 0.7em 1.5em;
          text-transform: uppercase;
          transition: all 0.25s ease;
        }

        .btn:hover {
          background: #1ecd97;
          color: #333;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          max-width: 760px;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
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

export default Home
