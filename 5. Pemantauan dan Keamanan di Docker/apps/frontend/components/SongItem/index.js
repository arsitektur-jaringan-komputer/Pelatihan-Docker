import Router from 'next/dist/next-server/server/router';
import React, { Component } from 'react';
import AuthenticationError from '../../lib/utils/AuthenticationError';
import fetcher from '../../lib/utils/fetcher';
import getBaseURL from '../../lib/utils/storage';
import styles from './SongItem.module.scss';

class SongItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      songDetails: null,
    };

    this.onItemClick = this.onItemClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  async onItemClick(e) {
    if (!e.target.closest('.song_item__actions')) {
      const { song } = this.props;
      const { id } = song;

      try {
        const { data } = await fetcher(`${getBaseURL()}songs/${id}`);
        const songDetails = data.song;

        if (songDetails.album_id) {
          const { data: { album } } = await fetcher(`${getBaseURL()}albums/${songDetails.album_id}`);
          songDetails.album = album.name;
        }
        this.setState((prevState) => ({ isExpanded: !prevState.isExpanded, songDetails }));
      } catch (error) {
        console.error('Error fetching song details:', error);
      }
    }
  }

  onEditClick(e, id) {
    e.stopPropagation();
    window.location.href = `/songs/edit/${id}`;
  }

  async onDeleteClick(e, id) {
    e.stopPropagation();

    if (!window.confirm('Are you sure want to delete this song?')) {
      return;
    }

    try {
      const response = await fetcher(`${getBaseURL()}songs/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 'success') {
        window.location.href = '/songs';
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
    const { song } = this.props;
    const {
      title, performer,
    } = song;
    const { isExpanded, songDetails } = this.state;

    return (
      <li className={styles.song_item} onClick={this.onItemClick}>
        <div className={styles.song_item__header}>
          <h2 className={`${styles.song_item__title} ${isExpanded ? styles.expanded_title : ''}`}>
            {title}
            <span>
              &nbsp;(
              {performer}
              )
            </span>
          </h2>
          <div className={styles.song_item__actions}>
            <button type="button" className={styles.song_item__button} onClick={(e) => this.onEditClick(e, song.id)}>
              <img src="./icon/edit.svg" alt="Edit" width="20px" />
            </button>
            <button type="button" className={styles.song_item__button} onClick={(e) => this.onDeleteClick(e, song.id)}>
              <img src="./icon/delete.svg" alt="Delete" width="25px" />
            </button>
          </div>
        </div>
        {isExpanded && (
          <ul className={styles.expanded_content}>
            <li className={styles.song_item__content}>
              <span className={styles.content_label}>
                Year:
                <span className={styles.content_detail}>
                  &nbsp;
                  {songDetails?.year}
                </span>
              </span>
            </li>
            <li className={styles.song_item__content}>
              <span className={styles.content_label}>
                Genre:
                <span className={styles.content_detail}>
                  &nbsp;
                  {songDetails?.genre}
                </span>
              </span>
            </li>
            <li className={styles.song_item__content}>
              <span className={styles.content_label}>
                Duration:
                <span className={styles.content_detail}>
                  &nbsp;
                  {songDetails?.duration || '-'}
                </span>
              </span>
            </li>
            <li className={styles.song_item__content}>
              <span className={styles.content_label}>
                Album:
                <span className={styles.content_detail}>
                  &nbsp;
                  {songDetails?.album || '-'}
                </span>
              </span>
            </li>
          </ul>
        )}
      </li>
    );
  }
}

export default SongItem;
