import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setQuery, setSearchType } from "@pwa/features/search";

import SearchForm from "./Form";
import ResultsDisplay from "./ResultsDisplay";

import styles from "./Container.module.css";

interface ContainerProps {
  type: "people" | "films";
  query: string;
  onSearchSubmit: (values: {
    searchType: "people" | "films";
    searchQuery: string;
  }) => void;
  onResultClick: (id: string, type: "people" | "films") => void;
}

const Container: React.FC<ContainerProps> = ({
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

export default Container;
