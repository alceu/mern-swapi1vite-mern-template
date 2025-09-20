import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import SearchForm from "../features/search/components/SearchForm";
import ResultsDisplay from "../features/search/components/ResultsDisplay";
import styles from "./SearchPage.module.css";
import { useGetPeopleQuery, useGetFilmsQuery } from "../features/api/swapiApi";
import { usePostSearchQueryMutation } from "../features/api/statsApi";

const SearchPage: React.FC = () => {
  const [searchType, setSearchType] = useState<"people" | "films">("people");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: peopleData, isLoading: peopleLoading, isError: peopleError } = useGetPeopleQuery(searchQuery, {
    skip: searchType !== "people" || searchQuery.length < 1,
  });
  const { data: filmsData, isLoading: filmsLoading, isError: filmsError } = useGetFilmsQuery(searchQuery, {
    skip: searchType !== "films" || searchQuery.length < 1,
  });

  const [postSearchQuery] = usePostSearchQueryMutation();

  const data = searchType === "people" ? peopleData : filmsData;
  const isLoading = searchType === "people" ? peopleLoading : filmsLoading;
  const isError = searchType === "people" ? peopleError : filmsError;

  useEffect(() => {
    if (!isLoading && !isError && data && searchQuery.length > 0) {
      postSearchQuery({ query: searchQuery });
    }
  }, [data, isLoading, isError, searchQuery, postSearchQuery]);

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
        <ResultsDisplay data={data} isLoading={isLoading} isError={isError} searchType={searchType} />
      </div>
    </div>
  );
};

export default SearchPage;
