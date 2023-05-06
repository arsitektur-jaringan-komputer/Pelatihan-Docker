import Head from 'next/head';
import React, { Component } from 'react';
import Router from 'next/router';
import HeadBar from '../../components/Common/HeadBar';
import Playlists from '../../components/Playlists';
import FloatingButton from '../../components/Common/FloatingButton';

import styles from './Playlist.module.scss';
import getBaseURL from '../../lib/utils/storage';
import { fetchWithAuthentication } from '../../lib/utils/fetcher';
import AuthenticationError from '../../lib/utils/AuthenticationError';

const onAddPlaylistClick = () => {
  if (window) {
    window.location.href = '/playlists/new';
  }
};

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
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
    await this._fetch();
  }

  async _fetch() {
    try {
      const { data: { playlists } } = await fetchWithAuthentication(`${getBaseURL()}playlists`);
      this.setState(() => ({ playlists, empty: playlists.length < 1 }));
    } catch (error) {
      if (error instanceof AuthenticationError) {
        if (window) {
          alert(error.message);
        }
        await Router.push('/login');
      }
      this.setState((prevState) => ({ ...prevState, isError: true }));
    }
  }

  render() {
    const {
      playlists, isError, empty, accessToken,
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
              Error displaying playlist! Make sure you have done with the
              back-end or correct url.
            </p>
          ) : <Playlists empty={empty} playlists={playlists.reverse()} />}
        </main>
        <FloatingButton onClickHandler={onAddPlaylistClick} icon="/icon/add.svg" text="Add Playlist" />
      </div>
    );
  }
}

export default Playlist;
