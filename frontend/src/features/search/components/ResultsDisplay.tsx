import React from "react";
import { useSelector } from "react-redux";
import { selectSearchType } from "@features/search";

import ResultItem from "./ResultItem";

import styles from "./ResultsDisplay.module.css";

interface ResultsDisplayProps {
  data: any;
  isLoading: boolean;
  isError: boolean;
  onResultClick: (id: string, type: "people" | "films") => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  data,
  isLoading,
  isError,
  onResultClick,
}) => {
  const searchType = useSelector(selectSearchType);

  let content;

  if (isError) {
    content = (
      <div className={styles.resultsPlaceholder}>Error loading results.</div>
    );
  } else if (isLoading) {
    content = <div className={styles.resultsPlaceholder}>Searching...</div>;
  } else {
    const results = data?.result || [];

    if (!results.length) {
      content = (
        <div className={styles.resultsPlaceholder}>
          There are zero matches.
          <br />
          Use the form to search for People or Movies.
        </div>
      );
    } else {
      content = (
        <>
          {results.map((result: any) => (
            <ResultItem
              key={result.uid}
              id={result.uid}
              name={result.properties.name || result.properties.title}
              type={searchType}
              onResultClick={onResultClick}
            />
          ))}
        </>
      );
    }
  }

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.title}>Results</h2>
      {content}
    </div>
  );
};

export default ResultsDisplay;
