import { useEffect, useState } from 'react'

import Head from 'next/head'
import Router from 'next/router'

import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { getCookie } from '../utils/cookieStorage'
import {
  getFromStorage,
  saveToStorage,
  PlaylistsDataType,
} from '../utils/sessionStorage'

const defaultPlaylistTitle = 'Select a playlist on the left to see its songs!'

export const Dashboard = (): JSX.Element => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>()
  const [playlists, setPlaylists] = useState<PlaylistsDataType>()
  const [authToken, setAuthToken] = useState<string>()

  useEffect(() => {
    const token = getCookie('token')
    setAuthToken(token)

    if (!token) {
      Router.push('/')
    }
  }, [])

  useEffect(() => {
    const storedPlaylists = getFromStorage('playlists')

    // User arriving to the dashboard without playlists: redirect
    // to the screen that let's the user create the first playlist
    if (!storedPlaylists) Router.push('/addPlaylist?first=true')

    // User arriving to the dashboard, had some playlists from a
    // previous visit: let's load them from storage
    setPlaylists(storedPlaylists)

    // The user has just one playlist. Let's select this one by default
    if (storedPlaylists.length === 1) {
      setSelectedPlaylist(storedPlaylists[0].id)
    }
  }, [])

  const handleRemovePlaylist = (id: string) => {
    const filtered: PlaylistsDataType = playlists.filter((pl) => pl.id !== id)

    // Update the state
    setPlaylists(filtered)

    // Update the storage
    saveToStorage('playlists', filtered)
  }

  return (
    <div className="container">
      <Head>
        <title>Spotify Playlist App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article role="main">
        <Sidebar
          playlists={playlists}
          removePlaylist={handleRemovePlaylist}
          token={authToken}
        />
        <div className="content">
          <h1>
            {selectedPlaylist ? selectedPlaylist.title : defaultPlaylistTitle}
          </h1>
          <p>
            Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi
            welsh onion daikon amaranth tatsoi tomatillo melon azuki bean
            garlic.
          </p>
          <p>
            Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot
            courgette tatsoi pea sprouts fava bean collard greens dandelion okra
            wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
          </p>
        </div>
      </article>

      <Footer />

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .container {
          /* background: rgb(124, 188, 92); */
        }

        article {
          max-width: 1100px;
          width: 100%;
          min-height: calc(90vh - 50px);
          padding: 10px;
          border-radius: 4px;
          margin: 0 auto;
        }

        article::after {
          content: '';
          clear: both;
          display: block;
        }

        .content {
          float: right;
          width: 69%;
          /* color: #ccc; */
          border-radius: 4px;
          padding: 10px;
          /* height: calc(90vh - 100px); */
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

export default Dashboard
