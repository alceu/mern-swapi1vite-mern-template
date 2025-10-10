import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setQuery, setSearchType } from "@pwa/features/search";

import SearchForm from "./SearchForm";
import ResultsDisplay from "./ResultsDisplay";

import styles from "./SearchContainer.module.css";

interface SearchContainerProps {
  type: "people" | "films";
  query: string;
  onSearchSubmit: (values: {
    searchType: "people" | "films";
    searchQuery: string;
  }) => void;
  onResultClick: (id: string, type: "people" | "films") => void;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  type,
  query,
  onSearchSubmit,
  onResultClick,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchType(type));
    dispatch(setQuery(query));
  }, [dispatch, type, query]);

  const handleSearch = (values: {
    searchType: "people" | "films";
    searchQuery: string;
  }) => {
    onSearchSubmit(values);
  };

  return (
    <div className={styles.container}>
      <SearchForm onSearch={handleSearch} />
      <ResultsDisplay onResultClick={onResultClick} />
    </div>
  );
};

export default SearchContainer;
