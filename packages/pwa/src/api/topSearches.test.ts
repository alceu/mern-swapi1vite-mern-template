import { describe, expect, it } from "vitest";

describe("top searches api", () => {
  it("exposes the expected endpoints", async () => {
    const { topSearches } = await import("./topSearches");

    expect(topSearches.reducerPath).toBe("topSearchesApi");
    expect(topSearches.endpoints.getTopSearches).toBeDefined();
    expect(topSearches.endpoints.getTopSearchById).toBeDefined();
    expect(topSearches.endpoints.getComposedTopSearches).toBeDefined();
  });
});
