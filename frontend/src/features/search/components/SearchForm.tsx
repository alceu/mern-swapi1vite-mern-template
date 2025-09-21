import React from "react";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  searchType: "people" | "films";
  setSearchType: (type: "people" | "films") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchType,
  setSearchType,
  searchQuery,
  setSearchQuery,
}) => {
  const peoplePlaceholder = "e.g. Luke Skywalker, C-3PO, R2-D2";
  const filmsPlaceholder =
    "e.g. A New Hope, The Empire Strikes Back, Return of the Jedi";

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchType(event.target.value as "people" | "films");
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const currentPlaceholder =
    searchType === "people" ? peoplePlaceholder : filmsPlaceholder;

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
            checked={searchType === "people"}
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
            checked={searchType === "films"}
            onChange={handleSearchTypeChange}
          />
          Movies
        </label>
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder={currentPlaceholder}
        />
      </div>
      <button className={styles.button} disabled={searchQuery.length < 2}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchForm;
