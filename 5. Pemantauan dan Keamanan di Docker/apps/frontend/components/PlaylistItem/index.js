import Router from 'next/dist/next-server/server/router';
import React, { Component } from 'react';
import AuthenticationError from '../../lib/utils/AuthenticationError';
import { fetchWithAuthentication } from '../../lib/utils/fetcher';
import getBaseURL from '../../lib/utils/storage';
import styles from './PlaylistItem.module.scss';

class PlaylistItem extends Component {
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
    if (!e.target.closest('.playlist_item__actions')) {
      const { playlist } = this.props;
      const { id } = playlist;

      try {
        const { data: { playlist: { songs } } } = await fetchWithAuthentication(`${getBaseURL()}playlists/${id}/songs`);
        this.setState((prevState) => ({ isExpanded: !prevState.isExpanded, songs }));
      } catch (error) {
        console.error('Error fetching playlist details:', error);
      }
    }
  }

  onEditClick(e, id) {
    e.stopPropagation();
    window.location.href = `/playlists/edit/${id}`;
  }

  async onDeleteClick(e, id) {
    e.stopPropagation();

    if (!window.confirm('Are you sure want to delete this playlist?')) {
      return;
    }

    try {
      const response = await fetchWithAuthentication(`${getBaseURL()}playlists/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 'success') {
        window.location.href = '/playlists';
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
    const { playlist } = this.props;
    const {
      name, username,
    } = playlist;
    const { isExpanded, songs } = this.state;

    return (
      <li className={styles.playlist_item} onClick={this.onItemClick}>
        <div className={styles.playlist_item__header}>
          <h2 className={`${styles.playlist_item__title} ${isExpanded ? styles.expanded_title : ''}`}>
            {name}
            <span>
              &nbsp;by&nbsp;
              {username}
            </span>
          </h2>
          <div className={styles.playlist_item__actions}>
            <button type="button" className={styles.playlist_item__button} onClick={(e) => this.onEditClick(e, playlist.id)}>
              <img src="./icon/edit.svg" alt="Edit" width="20px" />
            </button>
            <button type="button" className={styles.playlist_item__button} onClick={(e) => this.onDeleteClick(e, playlist.id)}>
              <img src="./icon/delete.svg" alt="Delete" width="25px" />
            </button>
          </div>
        </div>
        {isExpanded && (
          <ul className={styles.expanded_content}>
            {songs.map((song) => (
              <li key={song.id}>
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

export default PlaylistItem;
