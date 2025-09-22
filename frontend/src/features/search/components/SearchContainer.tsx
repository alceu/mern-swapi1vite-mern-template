import React, { useEffect } from "react";

import styles from "./SearchContainer.module.css";
import SearchForm from "./SearchForm";
import ResultsDisplay from "./ResultsDisplay";
import { useGetPeopleQuery, useGetFilmsQuery } from "@api/swapiApi";
import { usePostSearchQueryMutation } from "@api/searchesStatsApi";

interface SearchContainerProps {
  type: "people" | "films";
  query: string;
  onTypeChange: (type: "people" | "films") => void;
  onQueryChange: (query: string) => void;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  type,
  query,
  onTypeChange,
  onQueryChange,
}) => {
  const { data: peopleData, isLoading: peopleLoading, isError: peopleError } = useGetPeopleQuery(query, {
    skip: type !== "people" || query.length < 2,
  });
  const { data: filmsData, isLoading: filmsLoading, isError: filmsError } = useGetFilmsQuery(query, {
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

  return (
    <div className={styles.container}>
      <SearchForm
        type={type}
        onTypeChange={onTypeChange}
        query={query}
        onQueryChange={onQueryChange}
        isLoading={isSearching}
      />
      <ResultsDisplay
        data={displayData}
        isLoading={isSearching}
        isError={isError}
        searchType={type}
      />
    </div>
  );
};

export default SearchContainer;