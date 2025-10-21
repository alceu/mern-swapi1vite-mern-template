import express from "express";

import searchQueriesRouter from "./searchQueries";
import topSearchesRouter from "./topSearches";

const router = express.Router();

router.use("/search-queries", searchQueriesRouter);

router.use("/top-searches", topSearchesRouter);

export default router;
