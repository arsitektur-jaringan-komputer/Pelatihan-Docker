import Router from 'next/router';
import React, { Component } from 'react';
import Head from 'next/head';
import HeadBar from '../../../components/Common/HeadBar';
import AuthenticationError from '../../../lib/utils/AuthenticationError';
import { fetchWithAuthentication } from '../../../lib/utils/fetcher';
import getBaseURL from '../../../lib/utils/storage';
import styles from './Edit.module.scss';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      year: '',
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
      const { id: albumId } = this.props;
      const { data: { album } } = await fetchWithAuthentication(`${getBaseURL()}albums/${albumId}`);
      this.setState({ ...album, accessToken });
    } catch (error) {
      console.error('Error fetching albums:', error);
      this.setState({ error: error.message });
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const {
      id, name, year, accessToken,
    } = this.state;

    if (!accessToken) {
      await Router.push('/login');
      return;
    }

    try {
      const response = await fetchWithAuthentication(`${getBaseURL()}albums/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, year,
        }),
      });

      if (response.status === 'success') {
        window.location.href = '/albums';
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

      console.error('Error updating album:', error);
      this.setState({ error: error.message });
    }
  }

  render() {
    const {
      name, year, error, accessToken,
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
        <div className={styles.edit_album}>
          <h1>Edit Album</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">
              Name
              <input type="text" name="name" value={name} onChange={this.handleInputChange} />
            </label>
            <label htmlFor="year">
              Year
              <input type="text" name="year" value={year} onChange={this.handleInputChange} />
            </label>
            <button type="submit">Submit</button>
            {error && <p className={styles.error_message}>{error}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  return { props: { id } };
}

export default Edit;
