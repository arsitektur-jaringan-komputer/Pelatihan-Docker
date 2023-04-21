import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import style from './Register.module.scss';
import fetcher from '../../lib/utils/fetcher';
import getBaseURL from '../../lib/utils/storage';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fullname: '',
    };

    this.handleFullnameChange = this.handleFullnameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleFullnameChange({ target }) {
    this.setState((prevState) => ({
      ...prevState,
      fullname: target.value,
    }));
  }

  async handleSubmit() {
    try {
      const { username, password, fullname } = this.state;
      await fetcher(`${getBaseURL()}users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, fullname }),
      });

      await Router.push('/login');
    } catch (error) {
      if (window) {
        alert(error.message);
      }
    }
  }

  render() {
    const {
      username, password, fullname,
    } = this.state;
    return (
      <div>
        <div className={style.container}>
          <Head>
            <title>
              { process.env.NEXT_PUBLIC_APP_NAME || 'Music' }
              &nbsp;Apps&nbsp;|&nbsp;Register
            </title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <header>
              <h1>
                Welcome to
                {' '}
                <a href="/">Notes Apps</a>
              </h1>
              <p>
                Please Register to Continue
              </p>
            </header>

            <div className={style.input_container}>
              <input type="text" placeholder="username" value={username} onChange={this.handleUsernameChange} />
              <input type="password" placeholder="password" value={password} onChange={this.handlePasswordChange} />
              <input type="text" placeholder="full name" value={fullname} onChange={this.handleFullnameChange} />
              <button type="button" onClick={this.handleSubmit}>Register</button>
            </div>

            <Link href="/login">Back to login</Link>
          </main>
        </div>
      </div>
    );
  }
}
