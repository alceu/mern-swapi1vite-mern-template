import { describe, expect, it } from "@jest/globals";

import router from "@api/routes";
import searchQueriesRouter from "@api/routes/searchQueries";
import topSearchesRouter from "@api/routes/topSearches";

describe("routes index", () => {
  it("registers search query and top search routers", () => {
    const handlers = router.stack.map((layer) => layer.handle);

    expect(handlers).toContain(searchQueriesRouter);
    expect(handlers).toContain(topSearchesRouter);
  });
});
