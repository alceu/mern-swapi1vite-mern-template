import React, { useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import SearchContainer from "@features/search/components/SearchContainer";

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

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

  const handleResultClick = useCallback(
    (id: string, type: "people" | "films") => {
      if (type === "people") {
        navigate(`/people/${id}`);
      } else {
        navigate(`/films/${id}`);
      }
    },
    [navigate]
  );

  return (
    <SearchContainer
      type={type}
      query={query}
      onTypeChange={handleTypeChange}
      onQueryChange={handleQueryChange}
      onResultClick={handleResultClick}
    />
  );
};

export default SearchPage;
