import React, { Component } from 'react';
import Router from 'next/router';
import fetcher from '../../lib/utils/fetcher';
import getBaseURL from '../../lib/utils/storage';

class Logout extends Component {
  async componentDidMount() {
    try {
      await fetcher(`${getBaseURL()}authentications`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
      });

      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      await Router.push('/login');
    } catch (error) {
      if (window) {
        alert(error.message);
      }
    }
  }

  render() {
    return (
      <></>
    );
  }
}

export default Logout;
