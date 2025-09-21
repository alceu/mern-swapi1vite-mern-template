import React, { useState, useEffect } from "react";

import SearchForm from "./SearchForm";
import ResultsDisplay from "./ResultsDisplay";
import { useGetPeopleQuery, useGetFilmsQuery } from "../../api/swapiApi";
import { usePostSearchQueryMutation } from "../../api/searchesStatsApi";

interface SearchContainerProps {
  initialSearchType: "people" | "films";
  initialSearchQuery: string;
  onStateChange: (state: { type: "people" | "films"; query: string }) => void;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  initialSearchType,
  initialSearchQuery,
  onStateChange,
}) => {
  const [searchType, setSearchType] = useState(initialSearchType);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(
    initialSearchQuery
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
    onStateChange({ type: searchType, query: debouncedSearchQuery });
  }, [debouncedSearchQuery, searchType, onStateChange]);

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
    <>
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
    </>
  );
};

export default SearchContainer;