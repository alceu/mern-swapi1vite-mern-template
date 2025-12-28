import { describe, expect, it } from "vitest";

describe("search queries api", () => {
  it("exposes the expected endpoints", async () => {
    const { searchQueries } = await import("./searchQueries");

    expect(searchQueries.reducerPath).toBe("searchQueriesApi");
    expect(searchQueries.endpoints.getSearchQueryById).toBeDefined();
    expect(searchQueries.endpoints.postSearchQuery).toBeDefined();
  });
});
