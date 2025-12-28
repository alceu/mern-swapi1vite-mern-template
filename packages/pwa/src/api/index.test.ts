import { describe, expect, it } from "vitest";

describe("api index", () => {
  it("combines reducers and middlewares", async () => {
    const { reducers, middlewares } = await import("./index");

    expect(Object.keys(reducers)).toEqual(
      expect.arrayContaining(["swapiApi", "searchQueriesApi", "topSearchesApi"])
    );
    expect(middlewares.length).toBe(3);
  });
});
