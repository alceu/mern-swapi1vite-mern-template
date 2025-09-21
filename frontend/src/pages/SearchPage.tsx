import React, { useState, useEffect } from "react";

import Header from "../components/Header/Header";
import SearchForm from "../features/search/components/SearchForm";
import ResultsDisplay from "../features/search/components/ResultsDisplay";
import styles from "./SearchPage.module.css";
import { useGetPeopleQuery, useGetFilmsQuery } from "../features/api/swapiApi";
import { usePostSearchQueryMutation } from "../features/api/searchesStatsApi";

const SearchPage: React.FC = () => {
  const [searchType, setSearchType] = useState<"people" | "films">("people");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const {
    data: peopleData,
    isLoading: peopleLoading,
    isError: peopleError,
  } = useGetPeopleQuery(debouncedSearchQuery, {
    skip: searchType !== "people" || debouncedSearchQuery.length < 2,
  });
  const {
    data: filmsData,
    isLoading: filmsLoading,
    isError: filmsError,
  } = useGetFilmsQuery(debouncedSearchQuery, {
    skip: searchType !== "films" || debouncedSearchQuery.length < 2,
  });

  const [postSearchQuery] = usePostSearchQueryMutation();

  useEffect(() => {
    if (debouncedSearchQuery.length >= 2) {
      postSearchQuery({ query: debouncedSearchQuery, type: searchType });
    }
  }, [debouncedSearchQuery, searchType, postSearchQuery]);

  const data = searchType === "people" ? peopleData : filmsData;
  const isLoading = searchType === "people" ? peopleLoading : filmsLoading;
  const isError = searchType === "people" ? peopleError : filmsError;

  const displayData = debouncedSearchQuery.length >= 2 ? data : undefined;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <SearchForm
          searchType={searchType}
          setSearchType={setSearchType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ResultsDisplay
          data={displayData}
          isLoading={isLoading && debouncedSearchQuery.length >= 2}
          isError={isError}
          searchType={searchType}
        />
      </div>
    </div>
  );
};

export default SearchPage;
