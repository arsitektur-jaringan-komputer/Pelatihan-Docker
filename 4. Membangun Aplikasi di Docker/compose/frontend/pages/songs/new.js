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
      title: '',
      performer: '',
      year: '',
      genre: '',
      duration: undefined,
      albumId: undefined,
      albums: [],
      error: null,
      accessToken: null,
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
      const { data } = await fetchWithAuthentication(`${getBaseURL()}albums`);
      this.setState({ albums: data.albums, accessToken });
    } catch (error) {
      console.error('Error fetching albums:', error);
      this.setState({ error: error.message });
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const { albums } = this.state;

    this.setState({ [name]: value.trim() === '' ? undefined : value });

    if (name === 'albumId') {
      const selectedAlbum = albums.find((album) => album.name === value);
      console.log(selectedAlbum);

      if (selectedAlbum) {
        this.setState({ [name]: selectedAlbum.id });
      } else {
        this.setState({ [name]: undefined });
      }
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const {
      title, performer, year, genre, duration, albumId,
    } = this.state;
    console.log(this.state);

    try {
      const response = await fetchWithAuthentication(`${getBaseURL()}songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title, performer, year, genre, duration, albumId,
        }),
      });

      if (response.status === 'success') {
        window.location.href = '/songs';
      } else {
        throw new Error(response.message);
      }
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

  render() {
    const {
      title, performer, year, genre, duration, album, albums, error, accessToken,
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
            <h1>Add Song</h1>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="title">
                Title
                <input type="text" name="title" value={title} onChange={this.handleInputChange} />
              </label>
              <label htmlFor="performer">
                Performer
                <input type="text" name="performer" value={performer} onChange={this.handleInputChange} />
              </label>
              <label htmlFor="year">
                Year
                <input type="text" name="year" value={year} onChange={this.handleInputChange} />
              </label>
              <label htmlFor="genre">
                Genre
                <input type="text" name="genre" value={genre} onChange={this.handleInputChange} />
              </label>
              <label htmlFor="duration">
                Duration
                <input type="text" name="duration" value={duration} onChange={this.handleInputChange} />
              </label>
              <label htmlFor="albumId" className={styles.select_wrapper}>
                Album
                <select name="albumId" value={album} onChange={this.handleInputChange}>
                  <option value="">...</option>
                  {albums.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name}
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
