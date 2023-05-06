import React from 'react';
import styles from './Card.module.scss';

const Card = ({ imageSrc, title, url }) => (
  <div className={styles.card}>
    <a className={styles.card_link} href={url}>
      <div className={styles.image_container}>
        <img src={imageSrc} alt={title} className={styles.image} />
      </div>
      <div className={styles.title_container}>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </a>
  </div>
);

export default Card;
