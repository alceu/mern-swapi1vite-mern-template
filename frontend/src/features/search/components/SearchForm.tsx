import React, { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  type: "people" | "films";
  onTypeChange: (type: "people" | "films") => void;
  query: string;
  onQueryChange: (query: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  type: propType,
  onTypeChange,
  query: propQuery,
  onQueryChange,
  isLoading,
}) => {
  const [internalSearchType, setInternalSearchType] = useState(propType);
  const [internalSearchQuery, setInternalSearchQuery] = useState(propQuery);

  useEffect(() => {
    setInternalSearchType(propType);
  }, [propType]);

  useEffect(() => {
    setInternalSearchQuery(propQuery);
  }, [propQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (internalSearchQuery.length >= 2 || internalSearchQuery.length === 0) {
        onQueryChange(internalSearchQuery);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [internalSearchQuery, onQueryChange]);

  useEffect(() => {
    if (internalSearchType !== propType) {
      onTypeChange(internalSearchType);
    }
  }, [internalSearchType, onTypeChange, propType]);

  const peoplePlaceholder = "e.g. Luke Skywalker, C-3PO, R2-D2";
  const filmsPlaceholder =
    "e.g. A New Hope, The Empire Strikes Back, Return of the Jedi";

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInternalSearchType(event.target.value as "people" | "films");
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInternalSearchQuery(event.target.value);
  };

  const currentPlaceholder =
    internalSearchType === "people" ? peoplePlaceholder : filmsPlaceholder;

  return (
    <div className={styles.searchContainer}>
      <p className={styles.label}>What are you searching for?</p>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="searchType"
            value="people"
            className={styles.radio}
            checked={internalSearchType === "people"}
            onChange={handleSearchTypeChange}
          />
          People
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="searchType"
            value="films"
            className={styles.radio}
            checked={internalSearchType === "films"}
            onChange={handleSearchTypeChange}
          />
          Movies
        </label>
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          value={internalSearchQuery}
          onChange={handleSearchQueryChange}
          placeholder={currentPlaceholder}
        />
      </div>
      <button
        className={styles.button}
        disabled={internalSearchQuery.length < 2 || isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchForm;
