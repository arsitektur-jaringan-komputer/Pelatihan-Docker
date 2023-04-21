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
      year: '',
      error: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      await Router.push('/login');
    }

    this.setState({ accessToken });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const {
      name, year,
    } = this.state;

    try {
      const response = await fetchWithAuthentication(`${getBaseURL()}albums`, {
        method: 'POST',
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

      console.error('Error adding album:', error);
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
        <main>
          <div className={styles.add_album}>
            <h1>Add Album</h1>
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
        </main>
      </div>
    );
  }
}

export default New;
