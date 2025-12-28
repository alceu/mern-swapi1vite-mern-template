import { describe, expect, it } from "@jest/globals";

import TopSearch from "@api/models/TopSearch";

describe("TopSearch model", () => {
  it("defines expected schema fields", () => {
    const searchQueryPath = TopSearch.schema.path("searchQuery");

    expect(searchQueryPath).toBeDefined();
    expect(TopSearch.schema.path("percentage")).toBeDefined();
  });

  it("references SearchQuery for searchQuery field", () => {
    const searchQueryPath = TopSearch.schema.path("searchQuery");
    const options = searchQueryPath?.options as { ref?: string };

    expect(options.ref).toBe("SearchQuery");
  });
});
