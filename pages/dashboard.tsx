import { useEffect, useState } from 'react'

import Head from 'next/head'
import Router from 'next/router'

import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import PlaylistDetail from '../components/PlaylistDetail'
import { getCookie } from '../utils/cookieStorage'
import {
  getFromStorage,
  saveToStorage,
  PlaylistsDataType,
  addSongToPlaylist,
  removeSongfromPlaylist,
  removePlaylist,
} from '../utils/sessionStorage'
import { CurrentSongDataType } from '../utils/types'

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
    if (!storedPlaylists || storedPlaylists.length === 0) {
      Router.push('/addPlaylist?first=true')
      return
    }

    // User arriving to the dashboard, had some playlists from a
    // previous visit: let's load them from storage
    setPlaylists(storedPlaylists)

    // The user has some playlists, let's select the first one by default
    if (storedPlaylists.length >= 1) {
      setSelectedPlaylist(storedPlaylists[0].id)
    }
  }, [])

  const handleRemovePlaylist = (id: string) => {
    const filtered: PlaylistsDataType = removePlaylist(id)

    if (filtered.length > 0) {
      setSelectedPlaylist(filtered[0].id)
    } else {
      Router.push('/addPlaylist?first=true')
    }

    // Update the state
    setPlaylists(filtered)

    // Update the storage
    saveToStorage('playlists', filtered)
  }

  const handleSelectPlaylist = (id: string) => {
    setSelectedPlaylist(id)
  }

  const handleAddSongToPlaylist = (
    song: CurrentSongDataType,
    playlist: string
  ): void => {
    // Update storage
    const updatedPlayslists = addSongToPlaylist(playlist, song)

    // Update state
    setPlaylists(updatedPlayslists)

    // Keep the updated playlist selected
    setSelectedPlaylist(playlist)
  }

  const handleRemoveSong = (index: number) => {
    // Update storage
    const updated = removeSongfromPlaylist(selectedPlaylist, index)

    // Update state
    setPlaylists(updated)

    // Keep the updated playlist selected
    setSelectedPlaylist(selectedPlaylist)
  }

  const selectedPlaylistData = playlists
    ? playlists.find((pl) => pl.id === selectedPlaylist)
    : undefined

  return (
    <div className="container">
      <Head>
        <title>Spotify Playlist App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article role="main">
        <Sidebar
          playlists={playlists}
          selectPlaylist={handleSelectPlaylist}
          selectedPlaylist={selectedPlaylist}
          addSongToPlaylist={handleAddSongToPlaylist}
          token={authToken}
        />
        <PlaylistDetail
          playlist={selectedPlaylistData}
          removeSong={handleRemoveSong}
          removePlaylist={handleRemovePlaylist}
        />
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
