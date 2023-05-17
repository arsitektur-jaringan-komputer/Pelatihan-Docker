import Router from 'next/router';
import React, { Component } from 'react';
import Head from 'next/head';
import HeadBar from '../../components/Common/HeadBar';
import AuthenticationError from '../../lib/utils/AuthenticationError';
import { fetchWithAuthentication } from '../../lib/utils/fetcher';
import getBaseURL from '../../lib/utils/storage';
import styles from './New.module.scss';

class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      selectedSongs: [],
      availableSongs: [],
      error: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      await Router.push('/login');
      return;
    }

    try {
      const { data } = await fetchWithAuthentication(`${getBaseURL()}songs`);
      this.setState({ availableSongs: data.songs, accessToken });
    } catch (error) {
      console.error('Error fetching songs:', error);
      this.setState({ error: error.message });
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const { selectedSongs, availableSongs } = this.state;

    this.setState({ [name]: value.trim() === '' ? undefined : value });

    if (name === 'selectSong') {
      selectedSongs.push(availableSongs.find((s) => s.title === value));
      this.setState({ selectedSongs });
      this.setState(
        {
          availableSongs: availableSongs.filter(
            (s) => (
              s.title !== value
            ),
          ),
        },
      );
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const {
      name, selectedSongs,
    } = this.state;
    console.log(this.state);

    try {
      const response = await fetchWithAuthentication(`${getBaseURL()}playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (!response.status === 'success') {
        throw new Error(response.message);
      }

      const { playlistId } = response.data;

      selectedSongs.forEach(async (s) => {
        await fetchWithAuthentication(`${getBaseURL()}playlists/${playlistId}/songs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            songId: s.id,
          }),
        });
      });

      window.location.href = '/playlists';
    } catch (error) {
      if (error instanceof AuthenticationError) {
        if (window) {
          alert(error.message);
        }

        await Router.push('/login');
        return;
      }

      console.error('Error adding song:', error);
      this.setState({ error: error.message });
    }
  }

  onDeleteClick(event, song) {
    event.stopPropagation();

    const { selectedSongs, availableSongs } = this.state;
    availableSongs.push(song);
    this.setState({ availableSongs });
    this.setState(
      {
        selectedSongs: selectedSongs.filter(
          (s) => (
            s !== song
          ),
        ),
      },
    );
  }

  render() {
    const {
      name, selectedSongs, availableSongs, error, accessToken,
    } = this.state;

    if (!accessToken) {
      return (
        <></>
      );
    }

    return (
      <div>
        <Head>
          <title>
            { process.env.NEXT_PUBLIC_APP_NAME || 'Music' }
            &nbsp;Apps
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HeadBar />
        <main>
          <div className={styles.add_song}>
            <h1>Add Playlist</h1>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">
                Name
                <input type="text" name="name" value={name} onChange={this.handleInputChange} />
              </label>
              <label htmlFor="songs">
                Songs
                <ul>
                  {selectedSongs.map((s) => (
                    <li key={s.id}>
                      <p>
                        {s.title}
                        &nbsp;(
                        {s.performer}
                        )
                      </p>
                      <div className={styles.playlist_item__actions}>
                        <button type="button" className={styles.playlist_item__button} onClick={(e) => this.onDeleteClick(e, s)}>
                          <img src="/icon/delete.svg" alt="Delete" width="25px" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </label>
              <label htmlFor="songId" className={styles.select_wrapper}>
                Add song
                <select name="selectSong" onChange={this.handleInputChange}>
                  <option value="" defaultValue>...</option>
                  {availableSongs.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                      &nbsp;(
                      {s.performer}
                      )
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">Submit</button>
              {error && <p className={styles.error_message}>{error}</p>}
            </form>
          </div>
        </main>
      </div>
    );
  }
}

export default New;
