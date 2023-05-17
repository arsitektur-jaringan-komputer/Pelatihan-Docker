import React from 'react';
import SongItem from '../SongItem';
import styles from './Songs.module.scss';

const Songs = ({ songs, empty }) => {
  if (empty) {
    return (
      <div className={styles.empty}>
        <p>Please try add some song(s)</p>
      </div>
    );
  }

  return (
    <div className={styles.song_list}>
      {songs.map((song) => <SongItem key={song.id} song={song} />)}
    </div>
  );
};

export default Songs;
