
import React from 'react';
import styles from './SearchForm.module.css';

const SearchForm: React.FC = () => {
  return (
    <div className={styles.searchContainer}>
      <p className={styles.label}>What are you searching for?</p>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input type="radio" name="searchType" value="people" className={styles.radio} defaultChecked />
          People
        </label>
        <label className={styles.radioLabel}>
          <input type="radio" name="searchType" value="movies" className={styles.radio} />
          Movies
        </label>
      </div>
      <div className={styles.inputGroup}>
        <input type="text" className={styles.input} />
      </div>
      <button className={styles.button}>SEARCH</button>
    </div>
  );
};

export default SearchForm;
