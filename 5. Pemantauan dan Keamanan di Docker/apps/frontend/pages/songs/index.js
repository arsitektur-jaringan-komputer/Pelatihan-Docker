import Head from 'next/head';
import React, { Component } from 'react';
import Router from 'next/router';
import HeadBar from '../../components/Common/HeadBar';
import Songs from '../../components/Songs';
import FloatingButton from '../../components/Common/FloatingButton';

import styles from './Song.module.scss';
import getBaseURL from '../../lib/utils/storage';
import { fetchWithAuthentication } from '../../lib/utils/fetcher';
import AuthenticationError from '../../lib/utils/AuthenticationError';

const onAddSongClick = () => {
  if (window) {
    window.location.href = '/songs/new';
  }
};

class Song extends Component {
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
    await this._fetch();
  }

  async _fetch() {
    try {
      const { data: { songs } } = await fetchWithAuthentication(`${getBaseURL()}songs`);
      this.setState(() => ({ songs, empty: songs.length < 1 }));
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
      songs, isError, empty, accessToken,
    } = this.state;

    if (!accessToken) {
      return <></>;
    }

    return (
      <div>
        <Head>
          <title>Music Apps</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HeadBar />
        <main>
          {isError ? (
            <p className={styles.error}>
              Error displaying songs! Make sure you have done with the
              back-end or correct url.
            </p>
          ) : <Songs empty={empty} songs={songs.reverse()} />}
        </main>
        <FloatingButton onClickHandler={onAddSongClick} icon="/icon/add.svg" text="Add Song" />
      </div>
    );
  }
}

export default Song;
