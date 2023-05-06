import React from 'react';
import PlaylistItem from '../PlaylistItem';
import styles from './Playlists.module.scss';

const Playlists = ({ playlists, empty }) => {
  if (empty) {
    return (
      <div className={styles.empty}>
        <p>Please try add some playlist(s)</p>
      </div>
    );
  }

  return (
    <div className={styles.playlist_list}>
      {playlists.map((playlist) => <PlaylistItem key={playlist.id} playlist={playlist} />)}
    </div>
  );
};

export default Playlists;
