import React, { Component } from 'react';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';
import styles from './HeadBar.module.scss';
import fetcher from '../../../lib/utils/fetcher';
import getBaseURL from '../../../lib/utils/storage';
import HamburgerMenu from '../HamburgerMenu';

class HeadBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  async componentDidMount() {
    if (window) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const { id: userId } = jwtDecode(accessToken);
        const { data: { user } } = await fetcher(`${getBaseURL()}users/${userId}`);
        this.setState((prevState) => ({ ...prevState, user }));
      } catch {
        // doing nothing
      }
    }
  }

  toggleMenu() {
    this.setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
  }

  render() {
    const { user, isOpen } = this.state;
    return (
      <header className={styles.head_bar}>
        <div className={styles.menu_wrapper}>
          <HamburgerMenu isOpen={isOpen} toggleMenu={this.toggleMenu} />
        </div>
        <h1>
          <a href="/">
            { process.env.NEXT_PUBLIC_APP_NAME || 'Music' }
            <span> Apps</span>
          </a>
        </h1>
        <div className={styles.side_menu}>
          <p>
            Login as
            {' '}
            { user ? user.fullname : '...'}
          </p>
          <p>|</p>
          <Link href="/logout">Logout</Link>
        </div>
      </header>
    );
  }
}

export default HeadBar;
