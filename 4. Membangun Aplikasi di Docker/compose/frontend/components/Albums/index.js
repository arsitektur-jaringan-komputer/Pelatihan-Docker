import React from 'react';
import AlbumItem from '../AlbumItem';
import styles from './Albums.module.scss';

const Albums = ({ albums, empty }) => {
  if (empty) {
    return (
      <div className={styles.empty}>
        <p>Please try add some album(s)</p>
      </div>
    );
  }

  return (
    <div className={styles.album_list}>
      {albums.map((album) => <AlbumItem key={album.id} album={album} />)}
    </div>
  );
};

export default Albums;
