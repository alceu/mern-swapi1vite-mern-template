import React from "react";
import { useSearchParams } from "react-router-dom";

import SearchContainer from "../features/search/components/SearchContainer";

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleStateChange = (state: {
    type: "people" | "films";
    query: string;
  }) => {
    const newParams = new URLSearchParams();
    if (state.query.length >= 2) {
      newParams.set("query", state.query);
    }
    if (state.type === "films") {
      newParams.set("type", state.type);
    }
    setSearchParams(newParams);
  };

  return (
    <SearchContainer
      initialSearchType={
        searchParams.get("type") === "films" ? "films" : "people"
      }
      initialSearchQuery={searchParams.get("query") || ""}
      onStateChange={handleStateChange}
    />
  );
};

export default SearchPage;
