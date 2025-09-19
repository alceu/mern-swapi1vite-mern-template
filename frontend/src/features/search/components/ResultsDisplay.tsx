import React from "react";
import styles from "./ResultsDisplay.module.css";
import ResultItem from "./ResultItem";

interface ResultsDisplayProps {
  data: any;
  isLoading: boolean;
  isError: boolean;
  searchType: "people" | "films";
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  data,
  isLoading,
  isError,
  searchType,
}) => {
  if (isLoading) {
    return <div className={styles.resultsContainer}>Loading...</div>;
  }

  if (isError) {
    return (
      <div className={styles.resultsContainer}>Error loading results.</div>
    );
  }

  const results = data?.result || [];

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.title}>Results</h2>
      {results.length > 0 ? (
        <div>
          {results.map((result: any) => (
            <ResultItem
              key={result.uid}
              id={result.uid}
              name={result.properties.name || result.properties.title}
              type={searchType}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>There are zero matches.</p>
          <p className={styles.noResultsSubtext}>
            Use the form to search for People or Movies.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
