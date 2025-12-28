import { describe, expect, it } from "vitest";

import store from "./index";

describe("store", () => {
  it("exposes a configured store instance", () => {
    const state = store.getState();

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
