import Head from 'next/head';
import React, { Component } from 'react';
import Router from 'next/router';
import HeadBar from '../../components/Common/HeadBar';
import Albums from '../../components/Albums';
import FloatingButton from '../../components/Common/FloatingButton';

import styles from './Album.module.scss';
import getBaseURL from '../../lib/utils/storage';
import { fetchWithAuthentication } from '../../lib/utils/fetcher';
import AuthenticationError from '../../lib/utils/AuthenticationError';

const onAddAlbumClick = () => {
  if (window) {
    window.location.href = '/albums/new';
  }
};

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
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
      const { data: { albums } } = await fetchWithAuthentication(`${getBaseURL()}albums`);
      this.setState(() => ({ albums, empty: albums.length < 1 }));
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
      albums, isError, empty, accessToken,
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
              Error displaying albums! Make sure you have done with the
              back-end or correct url.
            </p>
          ) : <Albums empty={empty} albums={albums.reverse()} />}
        </main>
        <FloatingButton onClickHandler={onAddAlbumClick} icon="/icon/add.svg" text="Add Song" />
      </div>
    );
  }
}

export default Album;
