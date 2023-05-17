import Router from 'next/dist/next-server/server/router';
import React, { Component } from 'react';
import AuthenticationError from '../../lib/utils/AuthenticationError';
import fetcher from '../../lib/utils/fetcher';
import getBaseURL from '../../lib/utils/storage';
import styles from './AlbumItem.module.scss';

class AlbumItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      songs: [],
    };

    this.onItemClick = this.onItemClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  async onItemClick(e) {
    if (!e.target.closest('.album_item__actions')) {
      const { album } = this.props;
      const { id } = album;

      try {
        const { data: { album: { songs } } } = await fetcher(`${getBaseURL()}albums/${id}`);
        this.setState((prevState) => ({ isExpanded: !prevState.isExpanded, songs }));
      } catch (error) {
        console.error('Error fetching album details:', error);
      }
    }
  }

  onEditClick(e, id) {
    e.stopPropagation();
    window.location.href = `/albums/edit/${id}`;
  }

  async onDeleteClick(e, id) {
    e.stopPropagation();

    if (!window.confirm('Are you sure want to delete this album?')) {
      return;
    }

    try {
      const response = await fetcher(`${getBaseURL()}albums/${id}`, {
        method: 'DELETE',
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

      alert(error.message);
    }
  }

  render() {
    const { album } = this.props;
    const {
      name, year,
    } = album;
    const { isExpanded, songs } = this.state;

    return (
      <li className={styles.album_item} onClick={this.onItemClick}>
        <div className={styles.album_item__header}>
          <h2 className={`${styles.album_item__title} ${isExpanded ? styles.expanded_title : ''}`}>
            {name}
            <span>
              &nbsp;(
              {year}
              )
            </span>
          </h2>
          <div className={styles.album_item__actions}>
            <button type="button" className={styles.album_item__button} onClick={(e) => this.onEditClick(e, album.id)}>
              <img src="./icon/edit.svg" alt="Edit" width="20px" />
            </button>
            <button type="button" className={styles.album_item__button} onClick={(e) => this.onDeleteClick(e, album.id)}>
              <img src="./icon/delete.svg" alt="Delete" width="25px" />
            </button>
          </div>
        </div>
        {isExpanded && (
          <ul className={styles.expanded_content}>
            {songs.map((song) => (
              <li>
                {song.title}
                <span>
                  &nbsp;(
                  {song.performer}
                  )
                </span>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }
}

export default AlbumItem;
