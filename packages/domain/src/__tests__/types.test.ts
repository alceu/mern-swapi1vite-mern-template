import { describe, expect, expectTypeOf, it } from "vitest";

import type {
  IFilmDto,
  IPersonDto,
  ISearchQueryDto,
  ITopSearchDto,
  SearchType,
} from "../index";
import { isSearchType, SEARCH_TYPES } from "../index";

describe("domain types", () => {
  it("defines search types", () => {
    expectTypeOf<SearchType>().toEqualTypeOf<"films" | "people">();
  });

  it("exposes search query dto fields", () => {
    expectTypeOf<ISearchQueryDto>().toHaveProperty("query");
    expectTypeOf<ISearchQueryDto>().toHaveProperty("count");
    expectTypeOf<ISearchQueryDto>().toHaveProperty("_id");
  });

  it("exposes top search dto fields", () => {
    expectTypeOf<ITopSearchDto>().toHaveProperty("searchQuery");
    expectTypeOf<ITopSearchDto>().toHaveProperty("percentage");
  });

  it("exposes person and film dto fields", () => {
    expectTypeOf<IPersonDto>().toHaveProperty("uid");
    expectTypeOf<IFilmDto>().toHaveProperty("uid");
  });

  it("validates search type values at runtime", () => {
    expect(SEARCH_TYPES).toEqual(["films", "people"]);
    expect(isSearchType("films")).toBe(true);
    expect(isSearchType("droids")).toBe(false);
  });
});
