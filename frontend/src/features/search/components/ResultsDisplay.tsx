
import React from 'react';
import styles from './ResultsDisplay.module.css';
import ResultItem from './ResultItem';

const results = [
  { name: 'Biggs Darklighter' },
  { name: 'Obi-Wan Kenobi' },
  { name: 'Jar Jar Binks' },
  { name: 'Bib Fortuna' },
];

const ResultsDisplay: React.FC = () => {
  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.title}>Results</h2>
      {results.length > 0 ? (
        <div>
          {results.map((result) => (
            <ResultItem key={result.name} name={result.name} />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>There are zero matches.</p>
          <p className={styles.noResultsSubtext}>Use the form to search for People or Movies.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
