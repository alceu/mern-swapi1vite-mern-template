import { describe, expect, it } from "vitest";

import reducer, {
  setIsSearching,
  setQuery,
  setSearchType,
  selectIsSearching,
  selectQuery,
  selectSearchType,
} from "./index";

describe("search slice", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      query: "",
      searchType: "people",
      isSearching: false,
    });
  });

  it("updates the query and search state", () => {
    const nextState = reducer(
      { query: "", searchType: "people", isSearching: false },
      setQuery("luke")
    );

    expect(nextState.query).toBe("luke");
  });

  it("updates the search type", () => {
    const nextState = reducer(
      { query: "", searchType: "people", isSearching: false },
      setSearchType("films")
    );

    expect(nextState.searchType).toBe("films");
  });

  it("updates the searching flag", () => {
    const nextState = reducer(
      { query: "", searchType: "people", isSearching: false },
      setIsSearching(true)
    );

    expect(nextState.isSearching).toBe(true);
  });

  it("selects values from state", () => {
    const state = {
      features: {
        search: {
          query: "leia",
          searchType: "films",
          isSearching: true,
        },
      },
    };

    expect(selectQuery(state as any)).toBe("leia");
    expect(selectSearchType(state as any)).toBe("films");
    expect(selectIsSearching(state as any)).toBe(true);
  });
});
