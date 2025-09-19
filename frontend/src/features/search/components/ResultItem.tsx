import React from 'react';
import styles from './ResultItem.module.css';

interface ResultItemProps {
  name: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ name }) => {
  return (
    <div className={styles.itemContainer}>
      <p className={styles.name}>{name}</p>
      <button className={styles.button}>SEE DETAILS</button>
    </div>
  );
};

export default ResultItem;
