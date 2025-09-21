import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import SearchContainer from "@features/search/components/SearchContainer";

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type") === "films" ? "films" : "people";
  const query = searchParams.get("query") || "";

  const handleTypeChange = useCallback(
    (newType: "people" | "films") => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (newType === "films") {
          newParams.set("type", newType);
        } else {
          newParams.delete("type");
        }
        return newParams;
      });
    },
    [setSearchParams]
  );

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (newQuery.length >= 2) {
          newParams.set("query", newQuery);
        } else {
          newParams.delete("query");
        }
        return newParams;
      });
    },
    [setSearchParams]
  );

  return (
    <SearchContainer
      type={type}
      query={query}
      onTypeChange={handleTypeChange}
      onQueryChange={handleQueryChange}
    />
  );
};

export default SearchPage;
