/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './HamburgerMenu.module.scss';

const HamburgerMenu = ({ isOpen, toggleMenu }) => (
  <div className={styles.hamburger_menu} onClick={toggleMenu}>
    <div className={`${styles.line} ${isOpen ? styles.active : ''}`} />
    <div className={`${styles.line} ${isOpen ? styles.active : ''}`} />
    <div className={`${styles.line} ${isOpen ? styles.active : ''}`} />
    <nav className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
      <ul>
        <li />
        <li>
          <a href="/albums">Albums</a>
        </li>
        <li>
          <a href="/songs">Songs</a>
        </li>
        <li>
          <a href="/playlists">Playlists</a>
        </li>
      </ul>
    </nav>
  </div>
);

export default HamburgerMenu;
