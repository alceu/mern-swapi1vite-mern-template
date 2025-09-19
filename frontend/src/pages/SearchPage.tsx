import React from "react";
import Header from "../components/Header/Header";
import SearchForm from "../features/search/components/SearchForm";
import ResultsDisplay from "../features/search/components/ResultsDisplay";
import styles from "./SearchPage.module.css";

const SearchPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <SearchForm />
        <ResultsDisplay />
      </div>
    </div>
  );
};

export default SearchPage;
