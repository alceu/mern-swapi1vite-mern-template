import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../components/Header/Header";
import SearchForm from "../features/search/components/SearchForm";
import ResultsDisplay from "../features/search/components/ResultsDisplay";
import styles from "./SearchPage.module.css";
import { useGetPeopleQuery, useGetFilmsQuery } from "../features/api/swapiApi";
import { usePostSearchQueryMutation } from "../features/api/searchesStatsApi";

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState<"people" | "films">(
    searchParams.get("type") === "films" ? "films" : "people"
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || ""
  );
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>(
    searchQuery
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (debouncedSearchQuery.length >= 2) {
      newParams.set("query", debouncedSearchQuery);
    }
    if (searchType === "films") {
      newParams.set("type", searchType);
    }
    setSearchParams(newParams);
  }, [debouncedSearchQuery, searchType, setSearchParams]);

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
  const isSearching = isLoading && debouncedSearchQuery.length >= 2;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <SearchForm
          searchType={searchType}
          setSearchType={setSearchType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoading={isSearching}
        />
        <ResultsDisplay
          data={displayData}
          isLoading={isSearching}
          isError={isError}
          searchType={searchType}
        />
      </div>
    </div>
  );
};

export default SearchPage;
