import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import styles from './Login.module.scss';
import fetcher from '../../lib/utils/fetcher';
import getBaseURL from '../../lib/utils/storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      logged: false,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      alert('You already logged in');
      this.setState((prevState) => ({
        ...prevState,
        logged: true,
      }));
      await Router.push('/');
    }
  }

  async handleSubmit() {
    try {
      const { username, password } = this.state;
      const responseJson = await fetcher(`${getBaseURL()}authentications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const { data: { accessToken, refreshToken } } = responseJson;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      await Router.push('/');
    } catch (error) {
      if (window) {
        alert(error.message);
      }
    }
  }

  handleUsernameChange({ target }) {
    this.setState((prevState) => ({
      ...prevState,
      username: target.value,
    }));
  }

  handlePasswordChange({ target }) {
    this.setState((prevState) => ({
      ...prevState,
      password: target.value,
    }));
  }

  render() {
    const { username, password, logged } = this.state;

    if (logged) {
      return <></>;
    }

    return (
      <div>
        <div className={styles.container}>
          <Head>
            <title>
              { process.env.NEXT_PUBLIC_APP_NAME || 'Music' }
              &nbsp;Apps&nbsp;|&nbsp;Login
            </title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>
            <header>
              <h1>
                Welcome to
                {' '}
                <a href="/">
                  { process.env.NEXT_PUBLIC_APP_NAME || 'Music' }
                  &nbsp;Apps
                </a>
              </h1>

              <p>
                Please Login to Continue
              </p>
            </header>

            <div className={styles.input_container}>
              <input type="text" placeholder="username" value={username} onChange={this.handleUsernameChange} />
              <input type="password" placeholder="password" value={password} onChange={this.handlePasswordChange} />
              <button type="button" onClick={this.handleSubmit}>Login</button>
            </div>

            <Link className={styles.register_link} href="/register">Register new account</Link>
          </main>
        </div>
      </div>
    );
  }
}
