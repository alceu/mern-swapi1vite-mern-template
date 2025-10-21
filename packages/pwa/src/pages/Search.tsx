import React, { useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Search from "@pwa/features/search/Container";

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const type = searchParams.get("type") === "films" ? "films" : "people";
  const query = searchParams.get("query") || "";

  const onSearchSubmit = useCallback(
    (values: { searchType: "people" | "films"; searchQuery: string }) => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (values.searchType === "films") {
          newParams.set("type", values.searchType);
        } else {
          newParams.delete("type");
        }
        if (values.searchQuery.length >= 2) {
          newParams.set("query", values.searchQuery);
        } else {
          newParams.delete("query");
        }
        return newParams;
      });
    },
    [setSearchParams]
  );

  const handleResultClick = useCallback(
    (id: string, resultType: "people" | "films") => {
      const currentQuery = searchParams.get("query") || "";
      const currentType = searchParams.get("type") || "people";

      if (resultType === "people") {
        navigate(`/people/${id}`, {
          state: { fromSearch: true, query: currentQuery, type: currentType },
        });
      } else {
        navigate(`/films/${id}`, {
          state: { fromSearch: true, query: currentQuery, type: currentType },
        });
      }
    },
    [navigate, searchParams]
  );

  return (
    <Search
      type={type}
      query={query}
      onSearchSubmit={onSearchSubmit}
      onResultClick={handleResultClick}
    />
  );
};

export default SearchPage;
