import { describe, expect, it } from "vitest";

import rootReducer from "./rootReducer";

describe("rootReducer", () => {
  it("creates initial state with expected slices", () => {
    const state = rootReducer(undefined, { type: "unknown" });

    expect(state).toEqual(
      expect.objectContaining({
        features: expect.any(Object),
        swapiApi: expect.any(Object),
        searchQueriesApi: expect.any(Object),
        topSearchesApi: expect.any(Object),
      })
    );
  });
});
