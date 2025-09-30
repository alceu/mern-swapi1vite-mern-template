import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetPeopleQuery, useGetFilmsQuery } from "@pwa/api/swapiApi";
import { usePostSearchQueryMutation } from "@pwa/api/searchQueryApi";
import {
  selectQuery,
  selectSearchType,
  setIsSearching,
} from "@pwa/features/search";

import ResultItem from "./ResultItem";

import styles from "./ResultsDisplay.module.css";

interface ResultsDisplayProps {
  onResultClick: (id: string, type: "people" | "films") => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ onResultClick }) => {
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const type = useSelector(selectSearchType);

  const {
    data: peopleData,
    isLoading: peopleLoading,
    isError: peopleError,
  } = useGetPeopleQuery(query, {
    skip: type !== "people" || query.length < 2,
  });
  const {
    data: filmsData,
    isLoading: filmsLoading,
    isError: filmsError,
  } = useGetFilmsQuery(query, {
    skip: type !== "films" || query.length < 2,
  });

  const [postSearchQuery] = usePostSearchQueryMutation();

  useEffect(() => {
    if (query.length >= 2) {
      postSearchQuery({ query: query, type: type });
    }
  }, [query, type, postSearchQuery]);

  const data = type === "people" ? peopleData : filmsData;
  const isLoading = type === "people" ? peopleLoading : filmsLoading;
  const isError = type === "people" ? peopleError : filmsError;

  const displayData = query.length >= 2 ? data : undefined;
  const isSearching = isLoading && query.length >= 2;

  useEffect(() => {
    dispatch(setIsSearching(isSearching));
  }, [dispatch, isSearching]);

  let content;

  if (isError) {
    content = (
      <div className={styles.resultsPlaceholder}>Error loading results.</div>
    );
  } else if (isLoading) {
    content = <div className={styles.resultsPlaceholder}>Searching...</div>;
  } else {
    const results = displayData?.result || [];

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
