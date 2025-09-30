import express from "express";

import searchQueryRouter from "./searchQuery";
import topSearchRouter from "./topSearch";

const router = express.Router();

router.use("/search-queries", searchQueryRouter);
router.use("/top-searches", topSearchRouter);

export default router;
