import Head from 'next/head';
import React, { Component } from 'react';
import Router from 'next/router';
import HeadBar from '../components/Common/HeadBar';
import Songs from '../components/Songs';
import Card from '../components/Common/Card';

import styles from './Home.module.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      empty: false,
      isError: false,
      accessToken: null,
    };
  }

  async componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      await Router.push('/login');
      return;
    }
    this.setState((prevState) => ({
      ...prevState,
      accessToken,
    }));
  }

  render() {
    const {
      songs, isError, empty, accessToken,
    } = this.state;

    if (!accessToken) {
      return <></>;
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
          {isError ? (
            <p className={styles.error}>
              Error displaying musics! Make sure you have done with the
              back-end or correct url.
            </p>
          ) : <Songs empty={empty} songs={songs} />}
          <div className={styles.card_container}>
            <div className={styles.card_row}>
              <Card imageSrc="/image/album.png" title="Albums" url="/albums" />
              <Card imageSrc="/image/song.png" title="Songs" url="/songs" />
              <Card imageSrc="/image/playlist.png" title="Playlists" url="/playlists" />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
