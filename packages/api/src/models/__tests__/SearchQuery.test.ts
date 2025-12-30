import { describe, expect, it } from "@jest/globals";

import SearchQuery from "@api/models/SearchQuery";

describe("SearchQuery model", () => {
  it("defines expected schema fields", () => {
    expect(SearchQuery.schema.path("query")).toBeDefined();
    expect(SearchQuery.schema.path("type")).toBeDefined();
    expect(SearchQuery.schema.path("count")).toBeDefined();
  });

  it("indexes query and type uniquely", () => {
    const indexes = SearchQuery.schema.indexes();

    expect(
      indexes.some(
        ([fields, options]) =>
          fields.query === 1 && fields.type === 1 && options.unique === true
      )
    ).toBe(true);
  });
});
