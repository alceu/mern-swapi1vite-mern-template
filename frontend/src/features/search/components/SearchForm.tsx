import React from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { selectQuery, selectSearchType } from "@features/search";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  onSearch: (values: { searchType: "people" | "films"; searchQuery: string }) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  isLoading,
}) => {
  const type = useSelector(selectSearchType);
  const query = useSelector(selectQuery);

  const peoplePlaceholder = "e.g. Luke Skywalker, C-3PO, R2-D2";
  const filmsPlaceholder =
    "e.g. A New Hope, The Empire Strikes Back, Return of the Jedi";

  return (
    <Formik
      initialValues={{ searchType: type, searchQuery: query }}
      enableReinitialize
      onSubmit={onSearch}
    >
      {({ values }) => {
        const currentPlaceholder =
          values.searchType === "people" ? peoplePlaceholder : filmsPlaceholder;

        return (
          <Form className={styles.searchContainer}>
            <p className={styles.label}>What are you searching for?</p>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <Field
                  type="radio"
                  name="searchType"
                  value="people"
                  className={styles.radio}
                  checked={values.searchType === "people"}
                />
                People
              </label>
              <label className={styles.radioLabel}>
                <Field
                  type="radio"
                  name="searchType"
                  value="films"
                  className={styles.radio}
                  checked={values.searchType === "films"}
                />
                Movies
              </label>
            </div>
            <div className={styles.inputGroup}>
              <Field
                type="text"
                name="searchQuery"
                className={styles.input}
                placeholder={currentPlaceholder}
              />
            </div>
            <button
              type="submit"
              className={styles.button}
              disabled={values.searchQuery.length < 2 || isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchForm;
